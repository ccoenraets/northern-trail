#!/bin/bash

ORG_ALIAS="nto"
if [ "$#" -eq 1 ]; then
  ORG_ALIAS="$1"
fi

# Install script for the NTO org
echo ""
echo "Installing NTO org with alias: $ORG_ALIAS"
echo ""

echo "Creating scratch org..." && \
sfdx force:org:create -s -f config/project-scratch-def.json -d 30 -a $ORG_ALIAS && \
echo "" && \
echo "Pushing source..." && \
sfdx force:source:push -u $ORG_ALIAS
echo "" && \
echo "Assigning permissions..." && \
sfdx force:user:permset:assign -u $ORG_ALIAS -n nto && \
echo "" && \
echo "Importing sample data..." && \
sfdx force:data:tree:import --plan ./data/Merchandise__c-plan.json && \
sfdx force:data:tree:import --plan ./data/Account-Merchandising_Mix__c-plan.json

EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Installation completed."
  echo "Please follow the readme for a few required manual operations."
else
    echo "Installation failed."
fi
exit $EXIT_CODE