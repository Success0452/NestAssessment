## Creating a Resource in NestJS

To create a resource in NestJS using the CLI, follow these steps:

1. ### Preparation:
   - Open your terminal.
   - Navigate to the Rentrix's project directory.

2. ### Resource Creation:

   - Run the following command:

      ```bash
      npm run resource:create <resource-name>
      ```

      Replace `<resource-name>` with the name of your resource.

      For example:

      ```bash
      npm run resource:create users
      ```

      This command uses the NestJS CLI to generate a new resource.

   - When prompted, select option **1** (*REST API*).

   - Press `y` to confirm and generate the CRUD operations.

   This will create a new resource with all the necessary files, including a controller, service, module, and entity.

   - Navigate to the scripts folder using ``cd scripts`` and run the following command on your terminal:

      ```bash
      sh folders-init.sh <resource-name>
      ```

      3. Check and resolve any invalid imports in the following files:
         - `app.module.ts`
         - `<resource-name>.spec.ts`
         - `<resource-name>.controller.ts`
         - `<resource-name>.service.ts`

         Ensure that all imports are correct and that the new resource is properly registered in the `app.module.ts` file. If you encounter any issues, update the imports and module declarations as needed.

  4. On ``<resource-name>.service.ts`` and ``<resource-name>.controller.ts``:
      - Change `(+id)` to `(id)` in method parameters.
      - Change the type of `id` from `number` to `string` in method parameters and related type definitions.

      For example, in the service file:
      ```typescript
      findOne(id: string) {
        // Implementation
      }
      ```

      And in the controller file:
      ```typescript
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.service.findOne(id);
      }
      ```

      Make sure to update all occurrences of `id` parameters in both files.

> **Congratulations!** You've created a new resource in your NestJS project with all necessary CRUD components. Start building your API endpoints and implementing business logic.
