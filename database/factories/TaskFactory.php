<?php

use Faker\Generator as Faker;

$factory->define(App\Task::class, function (Faker $faker) {
    return [
        'title' => $faker->unique()->sentence(12),
        'description' => $faker->paragraph(8),
        'status' => 0
    ];
});
