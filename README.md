This task is done using React, Vite, Chakra UI, Yup, Formik.

# Frontend development admission development task

- ⏰ **Deadline**: The 11th business day following the assignment at **23:59:59 (CEST)**
- **We expect the project to be submitted to a public GitHub repository.**

## Description of the Task to be Implemented

### Car Rental Application

You are tasked with creating a simple car rental application.

The scoring weight for each task is as follows:

- The maximum score for a task is achievable only if the task is completed in its entirety.
- Each task carries the specified point value.
- :exclamation: **Partial points are available!**

  **Tip:** It's better to take the task as far as you can rather than doing nothing at all.

- :grey*exclamation: **It's okay if you struggle with some tasks!**
  \_We don't expect you to know everything immediately* :-) Attitude is key!

#### Public Interface `max. 150 points`

#### Task Description:

The task involves creating a public interface where users can:

- search for cars
- reserve a car by providing necessary details.

_We leave the design and layout of the interfaces up to you._

#### Tasks to be Completed:

_Search Interface_

1. On the homepage of the public interface, the user selects a **_from_** and a **_to_** date from a _date range picker_.
2. It displays a **list** of available cars with images and daily rates for the selected period.

_Reservation Management_

3. When clicking on a selected car, the user is taken to a page where they provide their details:

- Name,
- Email address,
- Address,
- Phone number,
- Number of days for booking
- Total cost of booking (depending on the number of days booked!)

4. Upon pressing a submit button, the booking is finalized.

_Tests_

5. Achieve a minimum of 50% test coverage.

### Admin Interface `max. 150 points`

#### Task Description:

An admin interface for minimal administration purposes.

- Implementation of a non-public administration interface at the `/admin` path.

On the admin page, we want to:

- see the bookings in a list
- edit cars (add new ones, edit existing data)

#### Tasks to be Completed:

_Display Booking Data_

6. Admin login
7. Interface to view bookings

_Edit Cars_

8. Edit existing cars
9. Add new cars

_Tests_

10. Achieve a minimum of 50% test coverage.

## Recommended Technology Stack:

- [Vue.JS](https://vuejs.org/) - **preferred**
  or
- [Angular 11+](https://angular.io/)

- Any CSS framework (Bootstrap or Bulma)
  or
- Use Material Design

- :information_source: Since this is a Frontend task, it's sufficient to use some form of JSON mock server to access the data.
