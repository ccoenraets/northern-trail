## Northern Trail Outfitters Sample App

Read [this blog post](https://developer.salesforce.com/blogs/developer-relations/2017/07/northern-trail-outfitters-new-sample-application-lightning-components-platform-events-salesforce-dx.html) to learn more about the application.

## Installation Instructions

1. Authenticate with your hub org (if not already done):
    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the northern-trail repository:
    ```
    git clone https://github.com/ccoenraets/northern-trail
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
    sfdx force:data:tree:import --plan ./data/Merchandise__c-plan.json
    sfdx force:data:tree:import --plan ./data/Account-Merchandising_Mix__c-plan.json
    ```

1. Open the scratch org:
    ```
    sfdx force:org:open
    ```

1. Click the **Merchandise Mixes** tab, and click a merchandise mix

1. Drag Merchandise from the right sidebar into the merchandise mix

1. Click the **Submitted to Manufacturing** step in the Path component

Install the [Northern Trail Manufacturing](https://github.com/ccoenraets/northern-trail-manufacturing) app to experiment with platform event-based integration.


Or, deploy to SFDX using the button below:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com/deploy?template=https://github.com/ccoenraets/northern-trail)
