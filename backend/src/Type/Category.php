<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Category extends ObjectType {
    public function __construct()
    {
        parent::__construct([
            'name' => 'Category',
            'description' => 'Product category',
            'fields' => static fn (): array => [
                'id' => Type::int(),
                'name' => Type::string(),
            ]
        ]);
    }
}