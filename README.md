# ack-test-1
Set of questions regarding the apollo-connector-kit and grapqhl in general

## Preparing the environment
To clone this repository on you local and start working on the questions follow this steps:
1. Fork this repo to your github account
2. Invite both **mohammed8079** and **ecerroni** as collaborators of the repository
3. Clone your forked repository to your local
4. Open a branch for the specific exercise number (ex. `test/1`)
5. Do your work, commit and push to the origin branch
6. When ready open a PR to master of your fork and assign mohammed8079/ecerroni as reviewers. Do not forget to use a title as the test title in this readme and a descrition of the work you did
7. mohammed8079/ecerroni will review the code
8. If ok, they'll ask you to merge
9. For next exercise start over from point 4

Note: Each subsequent branch must be created from master after the previous PR has been merged. Example:
Test/2 Branch cannot be created before Test/1 Branch has been merged to main.
Test branches always branc out from main branch, never from other branches.

## Installation
From the root of the cloned project run `yarn install-all`

## Dev servers
Run servers separately using a different terminal for each.

### Running backend
`cd backend && yarn start`
Server is running on port 9000


### Runnning frontend
`cd frontend-react && yarn start`

Server is running on port 9001

## Exercises
There are tree mocked users you may use for your exercies:

`rico` with ROLE ADMIN
`george` with ROLE USER
`mike` with ROLE STAFF

They share the same password: `123456`

When you need to test a role/permission query this would be the procedure:
- launch both frontend and backend, but in separate terminals
- go to http://localhost:9001
- login in with the user of choice
- open dev tools and click on the [apollo dev tool](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm) tab
![](/assets/apollo-graphiql.png)
- now that you are logged in you can use the graphiql of apollo to query your backend queries/mutation and it will automatically use the tokens you got by loggin in with the user. You need this to text the role/permission functionalities while you're coding your exercise



To logout open dev tools => Application tab => delete tokens. Finally refresh the browser
![](/assets/application-tab.png)
### ROLES AND PERMISSIONS

**Hierarchy tree**
*Branch: Test/1*
*PR: Hierarchy tree (ROLES AND PERMISSIONS)*

Define a roles/permissions  system in `/settings/role_permissions`.json that reflects the following hierarchy tree:
![Role/Permission TREE](/assets/tree.png "Reference tree")



### DATACOMPONENTS
*Branch: Test/2*
*PR: New datacomponent and new datacompnent part (DATACOMPONENTS)*
*Requirements:  Test/1 approved and merged*

**New datacomponent and new datacompnent part**
  1. Create a new datacomponent of any type using `yarn add-component-part` [**Commit**: New datacomponent]
  2. Create a new datacomponent part in the Various folder using `yarn add-component-part` [**Commit**: New datacompnent part]

-----
*Branch: Test/3*
*PR: Protected queries (DATACOMPONENTS)*
*Requirements:  Test/2 approved and merged*

**Protected queries** (private = for authenticated users, protected = for specific roles or permissions)

`_` in front of a query/mutation means that a user should be logged in (i.e. *has a valid token*) to execute the query/mutation. It is **not** important if his role is either `USER`, `HR`, `STAFF` or `ADMIN`

On the other hand **protected queries** by either ROLE or PERMISSION are more specific. For instance:
- `@roles.is.admin` means that the user should be logged in as an `ADMIN`
- `@permissions.can.read.user_profile` means the logged in user should have permission of operation `READ` on `SCOPE` USER_PROFILE

It is worth noting, for example, that both `_` and `@roles.is.admin` may be placed on the same query, but they are redundant.

So to conclude:
- "private query" means that the user should be logged in
- "protected query" means that the user should be logged in with a specific role or has a specific permission
- "protected query" is already a private query itself, so no need to also use `_`


**Tasks**:
  1. Create a private query that returns a random integer between 1 and 100 (i.e. only authenticated users can see this query) [**Commit**: Private Query returning random integer]
  2. Create a protected query for role USER that returns the user’s email of scalar EmailAddress [**Commit**: Protected query with scalar EmailAddress]
  3. Create a protected query with scope `USER_PROFILE` and operation `READ` (hint: permission) [**Commit**: Protected query with permissions constraint]
  4. Create a protected query for role USER. It returns a type User that has the field email protected based on role ADMIN [**Commit**: Protected query with mixed roles]

-----
*Branch: Test/4*
*PR: Query arguments (DATACOMPONENTS)*
*Requirements:  Test/3 approved and merged*

**Query arguments**
  1. Create a public query [**Commit**: Public query with optional string that returns string's length]

-----
*Branch: Test/5*
*PR: Errors (DATACOMPONENTS)*
*Requirements:  Test/4 approved and merged*

**Errors**
  1. Create a public query that accepts an optional string as an input and throws an error if the string is either missing or null/undefined or has length less than 8 [**Commit**: Public query with optional string and input validation that throws on error]



### DATASOURCES 
*Branch: Test/6*
*PR: Retrieve api data (DATASOURCES)*
*Requirements:  Test/5 approved and merged*

**Retrieve api data**
Create a query called getPokemonAbilities that accepts a mandatory integer called “id”.
  1. Create a Pokemon type with 3 fields: id, name, order
  2. Create a datasource that connects to the PokemonAPI:
*Requirements*:
  -Connects to https://pokeapi.co/api/v2
  -Create an async function that uses GET to retrieve JSON data from  /pokemon/1 (**"/1"** should be a dynamic id passed down by the datacomponent’s query)
3. Call the datasource from the query
4. Return a Pokemon type
[**Commit**: Retrieve api data]

-----
*Branch: Test/7*
*PR: Retrieve and transform data (DATASOURCES)*
*Requirements:  Test/6 approved and merged*

**Retrieve and transform data**

1. From the previous example add a field in the type called ‘abilities’ that is an array of String. Each string is an ability name that belongs to the queried pokemon, like “overgrow”. Use a type resolver for “abilities” (hint: transform the `abilities` array you’re getting in the response [**Commit**: Retrieve and transform api data]

### ADVANCE INPUT VALIDATION
*Branch: Test/8*
*PR: Directive @constraints string/number (ADVANCE INPUT VALIDATION)*
*Requirements:  Test/5 approved and merged*

**Custom string/number input validation**

This task must be solved using the `graphql-constraint-directive` package. The package is already integrated in the boilerplate. You just need to implement its API as explained [here](https://github.com/confuser/graphql-constraint-directive): 

  1. Create a public mutation that returns `true` and has a mandatory input argument named `input` of input type `StringValidationInput` that has a field named `text` of type `String`. This `text` field should satisfy the following constraints all at once:
  - Its length is greater or equatl to 2 and less or equal to 7
  - Its content starts with the word `foo` and contains the word `bar`
[**Commit**: Custom string input validation]

  2. Create a public mutation that returns `true` and   has a mandatory input argument named `input` of input type `NumberValidationInput` that has a field named `number` of type `Float`. This `number` field should satisfy the following constraints all at once:
  - Its value bigger than 2
  - Its value is less or equal to 7
  - Its value is a multiple of 3
[**Commit**: Custom number input validation]

-----
*Branch: Test/9*
*PR: Directive @constraints regex (ADVANCE INPUT VALIDATION)*
*Requirements:  Test/8 approved and merged*

**Custom string regex input validation**

This task must be solved using the `graphql-constraint-directive` package. The package is already integrated in the boilerplate. You just need to implement its API as explained [here](https://github.com/confuser/graphql-constraint-directive): 
  1. Create a public mutation that returns `true` and  has a mandatory input argument named `input` of input type `RegexValidationInput` that has a field named `password` of type `String`. This `password` field should satisfy the following constraints all at once using the  `pattern` api of the `graphql-constraint-directive` package:
  - Its value must contain at **least eight characters**, at **least one number** and both **lower and uppercase letters** and **special characters**. An additional note about this requirement. *You do not need to actually learn regex :) Just google a suitable regex pattern that satisfies the requirements and test it with Graphiql*
[**Commit**: Custom password regex input validation]

-----
*Branch: Test/10*
*PR: Yup input schema validation (ADVANCE INPUT VALIDATION)*
*Requirements:  Test/9 approved and merged*

**Custom schema input validation**

This task must be solved using the `Yup` package. The package is already integrated in the boilerplate. You just need to implement its API as explained [here](https://github.com/jquense/yup). Additionally you should find an example in `/src/backend/datacomponents/Various/test-data` to get you started with this task: 
  1. Create a public mutation that has the following mutation arguments and requirements:
  - title (String):
    - Set a default value to  `unknown` to use if `title` is missing in the query arguments
    - Trim the string value
    - Set a maximum length limit for the string value to `10`
  - publishDate (DateTime):
    - Set the minimum date allowed to any value you like 
  - content (String): 
    - Set a minimum length limit for the string value to `255`
    - Override the default error message with `It's too short`
  - scores (Array of Float, i.e. [Float]):
    - Array is an array of numbers only
    - Each value in the array must be a positive number
    - Each value in the array will be rounded
    - Ensure that the array is set to an empty array if it is null or missing

  This mutation should return the mutation arguments themselves
[**Commit**: Custom yup schema input validation]


---
### DB DATASOURCES
 [Next](https://github.com/ecerroni/ack-test-2)




