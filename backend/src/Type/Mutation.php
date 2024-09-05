<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ListOfType;
use GraphQL\Error\Error;

use App\DataFetcher;

class Mutation extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => TypeRegistry::load(Order::class),
                    'description' => 'Creates a new order',
                    'args' => [
                        'productIds' => new ListOfType(Type::id()),
                        'quantities' => new ListOfType(Type::int()),
                        'selectedAttributesIds' => new ListOfType(new ListOfType(Type::id())),
                    ],
                    'resolve' => static function($rootValue, array $args): array|Error {
                        return DataFetcher::createOrder($args['productIds'], $args['quantities'], $args['selectedAttributesIds']);
                    }
                ],
            ],
        ]);
        
    }
}
