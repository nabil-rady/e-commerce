<?php
    namespace App;

    use Doctrine\ORM\EntityManager;
    use Doctrine\ORM\ORMSetup;
    use Doctrine\DBAL\DriverManager;

    class DataFetcher {
        private static ?EntityManager $entityManager = null;

        public static function getEntityManager(): EntityManager {
            if (self::$entityManager === null) {
                $config = ORMSetup::createAttributeMetadataConfiguration(
                    paths: [__DIR__."/Entities"],
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

        public static function getCategory(int $id): null|array {
            $category = self::getEntityManager()->find(\App\Entities\Category::class, $id);
            if(!$category)   return null;
            return $category->toArray();
        }

        public static function getCategories(): array {
            $categories = self::getEntityManager()->getRepository(\App\Entities\Category::class)->findAll();
            return array_map(function($category) {
                return $category->toArray();
            }, $categories);        
        }

        public static function getAttributesByProductId(string $productId): array{
            $attributeSets = self::getEntityManager()->getRepository(\App\Entities\AttributeSet::class)->findBy([
                'productId' => $productId,
            ]);
            return array_map(function(\App\Entities\AttributeSet $attributeSet) {
                return $attributeSet->toArray();
            }, $attributeSets);
        }

        public static function getProducts(): array {
            $products =  self::getEntityManager()->getRepository(\App\Entities\Product::class)->findAll();
            return array_map(function(\App\Entities\Product $product) {
                return $product->toArray();
            }, $products);
        }
    }