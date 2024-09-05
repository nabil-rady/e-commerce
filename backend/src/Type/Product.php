<?php

namespace App\Type;

use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Product extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'description' => 'Product',
            'fields' => static fn (): array => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'price' => Type::float(),
                'brand' => Type::string(),
                'description' => Type::string(),
                'gallery' => [
                    'description' => 'Product images',
                    'type' => new ListOfType(Type::string()),
                    'resolve' => static function (array $rootValue) {
                        return $rootValue['gallery'];
                    }
                ],
                'category' => [
                    'type' => TypeRegistry::load(Category::class),
                    'description' => 'Product Category',
                    'resolve' => static function (array $rootValue) {
                        return $rootValue['category'];
                    }
                ],
                'attributes' => [
                    'type' => new ListOfType(TypeRegistry::load(AttributeSet::class)),
                    'description' => 'Product Attribute Set',
                    'resolve' => static function (array $rootValue) {
                        return $rootValue['attributes'];
                    }
                ]
            ]
        ]);
    }
}
