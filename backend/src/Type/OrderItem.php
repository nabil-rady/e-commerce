<?php

namespace App\Type;

use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItem extends ObjectType {
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItem',
            'description' => 'Order Item',
            'fields' => static fn (): array => [
                'product' => TypeRegistry::load(Product::class),
                'quantity' => Type::int(),
                'selectedAttributes' => new ListOfType(TypeRegistry::load(Attribute::class)),
            ],
        ]);
    }
}