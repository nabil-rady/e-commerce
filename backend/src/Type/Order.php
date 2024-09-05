<?php

namespace App\Type;

use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Order extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'description' => 'Order',
            'fields' => static fn (): array => [
                'id' => Type::int(),
                'items' => new ListOfType(TypeRegistry::load(OrderItem::class)),
            ]
        ]);
    }
}
