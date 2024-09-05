<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\DataFetcher;
use GraphQL\Type\Definition\ListOfType;

class AttributeSet extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'description' => 'Product Attribute Set',
            'fields' => static fn (): array => [
                'id' => Type::string(),
                'type' => Type::string(),
                'name' => Type::string(),
                'items' => [
                    'type' => new ListOfType(TypeRegistry::load(Attribute::class)),
                    'description' => 'Atrribute Items',
                    'resolve' => static function (array $rootValue) {
                        return $rootValue['items'];
                    },
                ]
            ],
        ]);
    }
}
