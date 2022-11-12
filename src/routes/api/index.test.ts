import t from "tap";
import { build } from "../../app";

t.test("api root", (t) => {
  t.test("Outputs version", async (t) => {
    const app = build();

    const res = await app.inject({
      method: "GET",
      url: "/api",
    });

    t.ok(res.statusCode >= 200);
    t.ok(res.json()["version"]);
  });
  t.end();
});
