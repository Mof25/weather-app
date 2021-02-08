import WeatherLocation from './components/weatherLocation';
import "@testing-library/jest-dom/extend-expect";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders card", async () => {
    const location = {
        location: "Lisbon"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(location)
        })
    );

    await act(async () => {
        render(<WeatherLocation weatherLocations={'Lisbon'} />, container);
    });

    expect(container.querySelector(".location-header").textContent).toBe(location.location);

    global.fetch.mockRestore();
});
