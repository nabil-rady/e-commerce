<?php

namespace App\Controller;

use EntityManagerFactory;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

require_once  __DIR__ . '/../entityManager.php';

class GraphQL {
    static public function handle() {
        try {

            $categoryType = new ObjectType([
                'name' => 'Category',
                'fields' => function() {
                    return [
                        'id' => [
                            'type' => Type::int(),
                        ],
                        'name' => [
                            'type' => Type::string(),
                        ],
                    ];
                },
            ]);

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'category' => [
                        'type' => $categoryType,
                        'args' => [
                            'id' => ['type' => Type::int()],
                        ],
                        'resolve' => function($rootValue, array $args) {
                            try {
                                $category = EntityManagerFactory::getEntityManager()->find(\App\Entities\Category::class, $args['id']);
                                
                                if (!$category) {
                                    return [
                                        'id' => null,
                                        'name' => null,
                                    ];
                                }
                                
                                return [
                                    'id' => $category->getId(),
                                    'name' => $category->getName(),
                                ];
                            } catch (\Exception $e) {
                                error_log($e->getMessage());
                                
                                return [
                                    'id' => null,
                                    'name' => null,  
                                ];
                            }
                        }
                    ],
                ],
            ]);
        
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
            );
        
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
        
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;
        
            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}