<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Attribute extends ObjectType {
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'description' => 'Product Attribute',
            'fields' => static fn (): array => [
                '_id' => Type::id(),
                'id' => Type::string(),
                'displayValue' => Type::string(),
                'value' => Type::string(),
            ]
        ]);
    }
}