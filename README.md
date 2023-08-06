# Application Tracker
I'm a spreadsheet person that likes to keep track of data, so when I started applying to jobs post graduation, I created a spreadsheet to keep track of all my applications. I quickly realized that this was a great opportunity to make a little website to make entering, storing, and viewing my applications a lot easier. Working on this website has been a learning process but I've really enjoyed working on it so far.

### How to Use
Not hosted yet but will be hosted on Vercel soon.

1. Create an account on the sign up page
2. Create your first job hunt
    - The idea of the website is to group applications into job hunts so users can have all their past and future job hunts in one place
4. Add applications to your job hunt on the Application page
    - Currently adding an application entails adding the following information to a form: Job Title, Company, Salary, Location, Date Applied, and Response/Status. These were just the things that I was keeping track of in my spreadsheet. I will most likely make this list of fields user defined in the future.
5. View your applications
    - The Applications page allows users to view all the current applications in a spreadsheet style. It gives the user a search bar to search all the applications and allows for sorting by different fields by clicking the headers.
    - Users can also favorite (still in the works), edit, and delete applications if they need to do so.

### Future Plans
- Create a stats page that displays job hunt stats like total time hunting, applications per day (graph), averages of application fields, etc
- Create a better profile page that allows users to edit their profiles.
- Create a hunts page for uesrs to edit their job hunts. Would also have a feature for finishing a job hunt (yay!).
- Create a settings page to allow users to set custom themes and define the fields they want to use for their applications.


### Tech Stack
Frontend: Vue.js and Typescript

Coming from a React background, Vue was pretty easy to pick up and I enjoyed it much more than React (I originally wanted to use Svelte for the frontend language but decided to go with Vue because it's more applicable to getting a job.). Typescript on the other hand was definetly hard to learn at first, but now that I understand it I won't go back. 

Backend: Supabase

I have loved using Supabase. I had never done user authentication before so I was a bit worried, but Supabase made it super easy. The dashboard on their website makes it very clear how to do basic CRUD operations and makes viewing current data easy. I really enjoy how it is just SQL with a nice developer dashboard and amazing documentation.

