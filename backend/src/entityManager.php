<?php
    use Doctrine\ORM\EntityManager;
    use Doctrine\ORM\ORMSetup;
    use Doctrine\DBAL\DriverManager;

    class EntityManagerFactory {
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
    }