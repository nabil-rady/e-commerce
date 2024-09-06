<?php

namespace App;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\QueryBuilder;
use GraphQL\Error\Error;

class DataFetcher
{
    private static ?EntityManager $entityManager = null;

    private static function getEntityManager(): EntityManager
    {
        if (self::$entityManager === null) {
            $config = ORMSetup::createAttributeMetadataConfiguration(
                paths: [__DIR__ . "/Entities"],
                isDevMode: true
            );
            $connectionParams = [
                'driver'   => 'pdo_mysql',
                'host'     => '127.0.0.1',
                'dbname'   => 'scandiwebtask',
                'user'     => 'root',
                'password' => '123',
            ];
            $connection = DriverManager::getConnection($connectionParams, $config);
            self::$entityManager = new EntityManager($connection, $config);
        }
        return self::$entityManager;
    }

    private static function getProductQuery(): QueryBuilder
    {
        $queryBuilder = self::getEntityManager()->createQueryBuilder();

        return $queryBuilder->select('p', 'c', 'pr', 'cu', 'g',)
            ->from(\App\Entities\Product::class, 'p')
            ->leftJoin('p.category', 'c')
            ->leftJoin('p.prices', 'pr')
            ->leftJoin('p.gallery', 'g')
            ->leftJoin('pr.currency', 'cu');
    }

    private static function getAttributesQuery(string $productId): QueryBuilder
    {
        $queryBuilder = self::getEntityManager()->createQueryBuilder();

        return $queryBuilder->select('aset', 'a')
            ->from(\App\Entities\AttributeSet::class, 'aset')
            ->leftJoin('aset.items', 'a')
            ->where('aset.productId = :productId')
            ->setParameter('productId', $productId);
    }

    public static function getCategory(int $id): Error|array
    {
        $category = self::getEntityManager()->find(\App\Entities\Category::class, $id);
        if ($category) {
            return $category->toArray();
        }
        http_response_code(404);
        throw new Error("Category not found");
    }

    public static function getCategories(): array
    {
        $categories = self::getEntityManager()->getRepository(\App\Entities\Category::class)->findAll();
        return array_map(function ($category) {
            return $category->toArray();
        }, $categories);
    }

    public static function getAttributesByProductId(string $productId): array
    {
        $attributeSets = self::getAttributesQuery($productId)->getQuery()->getResult();
        return array_map(function (\App\Entities\AttributeSet $attributeSet) {
            return $attributeSet->toArray();
        }, $attributeSets);
    }

    public static function getProducts(): array
    {
        $products =  self::getProductQuery()->getQuery()->getResult();
        return array_map(function (\App\Entities\Product $product) {
            return $product->toArray();
        }, $products);
    }

    public static function getProductsByCategory(string $categoryName): array
    {
        if (strtolower($categoryName) == 'all') {
            return self::getProducts();
        }

        $products = self::getProductQuery()
            ->where('c.name = :categoryName')
            ->setParameter('categoryName', $categoryName)
            ->getQuery()
            ->getResult();
        return array_map(function (\App\Entities\Product $product) {
            return $product->toArray();
        }, $products);
    }

    public static function getProductById(string $productId): array|Error
    {
        $product = self::getProductQuery()
            ->where('p.id = :productId')
            ->setParameter('productId', $productId)
            ->getQuery()->getOneOrNullResult();

        if ($product) {
            return $product->toArray();
        }
        http_response_code(404);
        throw new Error("Product not found");
    }

    public static function createOrder(array $productIds, array $quantites, array $selectedAttributesIds): array|Error
    {
        if (count($productIds) !== count($quantites) || count($selectedAttributesIds) !== count($quantites) || count($productIds) !== count($selectedAttributesIds)) {
            http_response_code(400);
            throw new Error('Improper request body');
        }

        $products = [];
        foreach ($productIds as $productId) {
            $product = self::getEntityManager()->find(\App\Entities\Product::class, $productId);
            if ($product == null) {
                http_response_code(404);
                throw new Error('Product not found: ' . $productId);
            }
            $products[] = $product;
        }

        $orderItems = [];
        foreach ($products as $index => $product) {
            $orderItem = new \App\Entities\OrderItem();
            $orderItem->setProduct($product);
            $orderItem->setQuantity($quantites[$index]);

            foreach ($selectedAttributesIds[$index] as $selectedAttributeId) {
                $attribute = self::getEntityManager()->getRepository(\App\Entities\Attribute::class)->find($selectedAttributeId);

                if (!$attribute) {
                    http_response_code(404);
                    throw new Error('Attribute not found: ' . $selectedAttributeId);
                }

                $orderItemAttribute = new \App\Entities\OrderItemAttribute();
                $orderItemAttribute->setAttribute($attribute);
                $orderItemAttribute->setOrderItem($orderItem);

                $orderItem->addAttribute($orderItemAttribute);
            }

            $orderItems[] = $orderItem;
        }

        $order = new \App\Entities\Order();
        foreach ($orderItems as $orderItem) {
            $order->addItem($orderItem);
            $orderItem->setOrder($order);
        }

        self::getEntityManager()->persist($order);

        foreach ($orderItems as $orderItem) {
            self::getEntityManager()->persist($orderItem);
            foreach ($orderItem->getAttributes() as $attribute) {
                self::getEntityManager()->persist($attribute);
            }
        }

        self::getEntityManager()->flush();

        return $order->toArray();
    }
}
