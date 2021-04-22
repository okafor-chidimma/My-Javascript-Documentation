/*
    memoization is a process that allows us to cache the values of recursive/expensive function calls so that the next time the function is called with the same argument(s), the cached value is returned rather than having to re-compute the function.

    This ensures that our applications run faster because we avoid the time it would usually take to re-execute the function by returning a value that’s already stored in memory.

    Why use memoization in React?
    In React functional components, when props within a component change, the entire component re-renders by default. In other words, if any value be it the state or props within a component updates, the entire component will re-render, including functions/components(child components)  defined within the component(parent components) that had the change which have not had their values/props altered.

    so wrapping the child component in a React.memo() HOC and exporting the memoized version of the component prevents the re-execution of the child component if the parent re-renders

    this means that when the parent component re-renders, the child will re-render but the the version of the child component inside the parent will be the cached version. the child component will only re-compile if the arguments(prop) coming into the child component changes

    so to use memoization, wrap the child component in a React.memo() before exporting the file

*/