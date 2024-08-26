<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\NonNull;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ListOfType;

use App\DataFetcher;

class Query extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'category' => [
                    'type' => TypeRegistry::load(Category::class),
                    'description' => 'Returns category by id',
                    'args' => [
                        'id' => new NonNull(Type::id()),
                    ],
                    'resolve' => static function($rootValue, array $args): array {
                        try{
                            return DataFetcher::getCategory($args['id']);
                        }
                        catch(\Exception $e){
                            error_log($e->getMessage());

                            return [
                                'id' => null,
                                'name' => null,
                            ];
                        }
                    }
                ],
                'categories' => [
                    'type' => new ListOfType(TypeRegistry::load(Category::class)),
                    'description' => 'Returns all categories',
                    'resolve' => static function($rootValue, array $args): array {
                        try{
                            return DataFetcher::getCategories();
                        }
                        catch(\Exception $e){
                            error_log($e->getMessage());

                            return [];
                        }
                    }
                ],
                'attributes' => [
                    'type' => new ListOfType(TypeRegistry::load(AttributeSet::class)),
                    'description' => 'Returns attributes of given product',
                    'args' => [
                        'productId' => new NonNull(Type::id()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array {
                        try{
                            return DataFetcher::getAttributesByProductId($args['productId']);
                        }
                        catch(\Exception $e){
                            error_log($e->getMessage());

                            return [];
                        }
                    }
                ],
                'products' => [
                    'type' => new ListOfType(TypeRegistry::load(Product::class)),
                    'description' => 'Returns all products',
                    'args' => [
                        'category' => new NonNull(Type::string()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array {
                        try{
                            return DataFetcher::getProductsByCategory($args['category']);
                        }
                        catch(\Exception $e){
                            error_log($e->getMessage());

                            return [];
                        }
                    }
                ],
                "product" => [
                    'type' => TypeRegistry::load(Product::class),
                    'description' => 'Returns product with certain id',
                    'args' => [
                        'id' => new NonNull(Type::id()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array {
                        try{
                            return DataFetcher::getProductById($args['id']);
                        }
                        catch(\Exception $e){
                            error_log($e->getMessage());

                            return [];
                        }
                    }
                ]
            ],
        ]);
        
    }
}
