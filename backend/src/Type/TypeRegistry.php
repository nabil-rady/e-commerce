<?php declare(strict_types=1);

namespace App\Type;

final class TypeRegistry
{
    private static array $types = [];

    public static function load(string $classname): \Closure
    {
        return static fn () => self::$types[$classname] ??= new $classname();
    }
}