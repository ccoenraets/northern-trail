## Northern Trail Outfitters Sample App

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)

## Installation Instructions

1. Authenticate with your hub org (if not already done):
    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the northern-trail repository:
    ```
    git clone https://github.com/trailheadx/northern-trail
    cd northern-trail
    ```

1. Create a scratch org and provide it with an alias (nto):
    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a nto
    ```

1. Push the app to your scratch org:
    ```
    sfdx force:source:push
    ```

1. Assign the nto permission set to the default user:
    ```
    sfdx force:user:permset:assign -n nto
    ```

1. Load sample data:
    ```
    sfdx force:data:tree:import --plan ./data/sample-data-Merchandise__c-plan.json
    ```

1. Open the scratch org:
    ```
    sfdx force:org:open
    ```

Or, deploy to SFDX using the button below:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)