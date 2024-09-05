<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\Type\Query;
use App\Type\Mutation;
use GraphQL\Error\Error;
use PDO;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery(new Query())
                ->setMutation(new Mutation())
            );
        
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
        
            $input = json_decode($rawInput, true);
            $query = $input['query'];
        
            $result = GraphQLBase::executeQuery($schema, $query);
            
            if(count($result->errors) !== 0){
                if(http_response_code() === 200){
                    http_response_code(500);
                }
            }

            $output = $result->toArray();
        } catch (Throwable $e) {
            error_log($e->getMessage());
            http_response_code(500);
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}