import http from "k6/http";
import {sleep} from "k6";

// setting a configuration for a load test
export const options = {
    stages: [
        // Ramp-up stage
        {duration: "5m", target: 1000}, // Ramp up to 1000 users over 5 minutes
        // Steady state stage
        {duration: "24h", target: 1000}, // Stay at 1000 users for 24 hours
        // Ramp-down stage
        {duration: "5m", target: 0}, // Ramp down to 0 users over 5 minutes
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
