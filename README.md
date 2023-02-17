# SCOIR Technical Interview for Front-End Engineers
This repo contains an exercise intended for Front-End Engineers.

## Instructions
1. Click "Use this template" to create a copy of this repository in your personal github account.
1. Using technology of your choice, complete [the assignment](./Assignment.md).
1. Update this README with
    * a `How-To` section containing any instructions needed to run/access your system.
    * an `Assumptions` section containing documentation on any assumptions made while interpreting the requirements.
1. Send an email with a link to your newly created repo containing the completed exercise.


## Expectations
1. This exercise is meant to drive a conversation.
1. Please invest only enough time needed to demonstrate your approach to problem solving, code design, etc.
1. Within reason, treat your solution as if it would become a production system.


## How-To
1. `npm install`
2. `npm run start`
3. open [http://localhost:3000](http://localhost:3000)

## Assumptions
1. "searching" didn't make sense given the UX. A dropdown/autocomplete seemed more appropriate.
2. I don't know if the exercise is old, or if its apart of the "problem", but the endpoint didnt include image urls. It required a separate lookup, which I went ahead and solved for quickly, but long term would discuss changes to our data model.
3. If this work around stuck, i would look into lazy loading or a virtual window, to limit the amount of images that were loaded up front if the caught list were persisted on refresh.