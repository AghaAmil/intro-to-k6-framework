import http from "k6/http";
import {sleep} from "k6";

// setting a configuration for a stress test
export const options = {
    stages: [
        /*

        below can be referred as actual values to put a load test for an application
        { duration: "5m", target: 1000 },
        { duration: "30m", target: 1000},
        { duration: "5m", target: 0 },


        */
        // Ramp-up stage
        {duration: "10s", target: 20}, // Ramp up to 20 users over 10 seconds
        // Steady state stage
        {duration: "30s", target: 20}, // Stay at 20 users for 30 seconds
        // Ramp-down stage
        {duration: "10s", target: 0}, // Ramp down to 0 users over 10 seconds
    ],
};

export default function () {
    http.get("https://test.k6.io");
    sleep(1);
    http.get("https://test.k6.io/contacts.php");
    sleep(1);
    http.get("https://test.k6.io/news.php");
    sleep(1);
}
