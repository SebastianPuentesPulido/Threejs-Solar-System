const router = (routes) => {
    console.log(routes);
}

window.addEventListener(() => {
    router(window.location.hash);
});