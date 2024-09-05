<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\NonNull;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ListOfType;
use GraphQL\Error\Error;

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
                    'resolve' => static function($rootValue, array $args): array|Error {
                        return DataFetcher::getCategory($args['id']);
                    }
                ],
                'categories' => [
                    'type' => new ListOfType(TypeRegistry::load(Category::class)),
                    'description' => 'Returns all categories',
                    'resolve' => static function($rootValue, array $args): array {
                        return DataFetcher::getCategories();
                    }
                ],
                'attributes' => [
                    'type' => new ListOfType(TypeRegistry::load(AttributeSet::class)),
                    'description' => 'Returns attributes of given product',
                    'args' => [
                        'productId' => new NonNull(Type::id()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array|Error {
                        return DataFetcher::getAttributesByProductId($args['productId']);
                    }
                ],
                'products' => [
                    'type' => new ListOfType(TypeRegistry::load(Product::class)),
                    'description' => 'Returns all products',
                    'args' => [
                        'category' => new NonNull(Type::string()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array {
                        return DataFetcher::getProductsByCategory($args['category']);
                    }
                ],
                "product" => [
                    'type' => TypeRegistry::load(Product::class),
                    'description' => 'Returns product with certain id',
                    'args' => [
                        'id' => new NonNull(Type::id()),
                    ] ,
                    'resolve' => static function($rootValue, array $args): array|Error {
                        return DataFetcher::getProductById($args['id']);
                    }
                ]
            ],
        ]);
        
    }
}
