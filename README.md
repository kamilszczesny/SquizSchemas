# CEMS Schemas

This repository is meant to store all json-schemas for data structures and form-schemas for CEMS backoffice UI. Files from this repo are available via Matrix Squiz and are used by CEMS API and Frontend app.
When introducing new schemas - they need to be versionned under sem-ver model.

# Folder structure

  - schemasRepository // this directory is for editing purposes
    - data
        - components
        - items
        - atomicData
        - exampleComponents
        - exampleItems
        - exampleAtomicData
    - forms
        - components
        - items
        - controls
  - outputSchemas
    - data // used as a contract with CEMS clients, defines data structures
        - components
        - items
        - atomicData
        - exampleComponents
        - exampleItems
        - exampleAtomicData
    - forms // used in CEMS for forms generating
        - components
        - items
        - controls

### Glossary
1. Component - more complicated structure like slider
2. Item - element in listing components like image or banner
3. control - atomic form item - very basic

# Collaborating

Creation of each new component within CEMS starts with data structure definition. Json-schema for this data needs to be created. 
Within this new data structure atomicData structures need to be reused. Introducing new atomic data structures needs review form CEMS Team.

While definiing json-schema definition in `/schemasRepository/data/...` directory `"$ref"` property is recommended to be used.

**Short colaboration process example:**
1. New json-schema is created in `/schemasRepository/data/components`
2. It reuses already available `image` and `link` data structures from `/schemasRepository/data/atomicData` directory with usage of `"$ref"` in json-schema
3. Based on that data structure form-schema is created in `schemasRepository/form/components/` directory
4. It reuses `mediaLibrary` and `link` form elements from `/schemasRepository/form/controls/` with usage of `"$ref"` property aswell.
5. Now new changes can be populated to `/outputSchemas` directory with Gulp task.

### Gulp task for output schemas generation
Only output schemas are used in CEMS. They contain dereferenced json-schemas and form-schemas for making their usage easier.

Compiling/Dereferencing schemas:
```
npm install
gulp compileSchemas
```

Gulp watch task - updates output schemas with each change:
```
gulp watchSchemas
```
