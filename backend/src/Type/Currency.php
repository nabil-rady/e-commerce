<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Currency extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'description' => 'Currency of price',
            'fields' => static fn (): array => [
                'label' => Type::id(),
                'symbol' => Type::string(),
            ]
        ]);
    }
}
