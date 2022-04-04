from django.test import Client, TestCase

class classTestCase(TestCase):
    def setUp(self) -> None:
        self.client = Client()

    def test_inital_call(self):
        resp = self.client.get("/api/classes")
        self.assertEqual(resp.status_code, 200)
        for course in resp.json():
            self.assertEqual("id" in course, True)
            self.assertEqual("", True)
