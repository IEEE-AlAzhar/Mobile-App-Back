# The projects of the competition

Here's the list of the projects to pick to contribute to our code base and their requirements:

1. Fix the authentication of the user on every visit. (back & front)
1. Make the app responsive. (front)
1. Add the activity module. (back & front)
1. More suggestions.

## 1. Fix the authentication of the user on every visit (Beginner - Intermediate)

When the user sign in, he get a token and the token stored in the `localStorage`. To check if the user is logged in on every page, we check if there's any token in the localStorage, if exists go to the page or to login page if not existed.

The problem is that if the token is not valid anymore the token is still in the localStorage and it redirects to the dashboard pages even if the user if not authenticated on the back.

See what `endpoint` you'll need and type it in your proposal. If you'll work in the front, then you'll specify what `endpoint` you'll need from the back and how it should look like, if you'll work in the back, you'll need to explain what `endpoint` you'll create and what it does.

## 2. Make the app responsive (Beginner)

Our app is awesome, perfect and fantastic but on desktop only. We want to make the app responsive and user-friendly on mobile devices.

## 3. The Activity module (Intermediate - advanced)

We need to know who does what and when, so we need to add the `activity` module that shows who did what and when.

If you'll work on the front, then you need to explain what you'll do and what `endpoint` you'll need from the back-end to handle this.

If you'll work on the back, then you'll need to explain what `endpoints`/`middlewares` you'll add and what it does.

## 4. More suggestions

If you have a suggestion or a big issue you encountered, please mention it in your proposal.
