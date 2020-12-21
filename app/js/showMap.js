function showMap(address, service) {

    service.geocode({
        q: address,
    }, (result) => {
        result.items.forEach((item) => {
            map.addObject(new H.map.Marker(item.position));
        });
    }, alert);
}

export { showMap };