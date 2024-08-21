<?php
    namespace App;

    use Doctrine\ORM\EntityManager;
    use Doctrine\ORM\ORMSetup;
    use Doctrine\DBAL\DriverManager;

    class DataFetcher {
        private static ?EntityManager $entityManager = null;

        private static function getEntityManager(): EntityManager {
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

        public static function getCategories(): null|array {
            $categories = self::getEntityManager()->getRepository(\App\Entities\Category::class)->findAll();
            return array_map(function($category) {
                return $category->toArray();
            }, $categories);        
        }
    }