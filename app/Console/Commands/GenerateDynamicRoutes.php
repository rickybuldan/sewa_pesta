<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\MenusAccess;

class GenerateDynamicRoutes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-dynamic-routes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate route file dynamically based on MenusAccess data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Generating dynamic routes...");

        try {
            $routes = "<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n";
            $routes .= "use App\\Http\\Controllers\\GeneralController;\n";
            $routes .= "use App\\Http\\Controllers\\JsonDataController;\n\n";

            $allowedRoutes = MenusAccess::all();

            foreach ($allowedRoutes as $routeData) {
                // // Validasi dasar
                // if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $routeData->name)) continue;
                // if (!preg_match('/^[a-zA-Z0-9_]+$/', $routeData->method)) continue;

                if ($routeData->param_type === 'VIEW') {
                    $routes .= "Route::get('{$routeData->url}', [GeneralController::class, '{$routeData->method}'])->name('{$routeData->name}');\n";
                } else {
                    $routes .= "Route::post('{$routeData->url}', [JsonDataController::class, '{$routeData->method}'])->name('{$routeData->name}');\n";
                }
            }

            $path = base_path('routes/generated.php');

            File::put($path, $routes);

            $this->info("Dynamic routes generated successfully at: routes/generated.php");
        } catch (\Exception $e) {
            $this->error("Failed to generate routes: " . $e->getMessage());
        }
    }
}
