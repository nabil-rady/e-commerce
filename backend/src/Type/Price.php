<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Price extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'description' => 'Product price',
            'fields' => static fn(): array => [
                'currency' => TypeRegistry::load(Currency::class),
                'amount' => Type::string(),
            ]
        ]);
    }
}
