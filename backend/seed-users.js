require("dotenv").config({ path: __dirname + "/.env" });
const connectDB = require("./src/config/database");
const User = require("./src/models/User");
const { hashPassword } = require("./src/utils/auth");

const seed = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@example.com";
    const studentEmail = "student@example.com";

    // Create admin if not exists
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const adminPassword = await hashPassword("Admin123");
      admin = await User.create({
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        name: "Admin User",
        isEligible: true,
      });
      console.log("Admin created:", admin.email);
    } else {
      console.log("Admin already exists:", admin.email);
    }

    // Create student if not exists
    let student = await User.findOne({ email: studentEmail });
    if (!student) {
      const studentPassword = await hashPassword("Student123");
      student = await User.create({
        email: studentEmail,
        password: studentPassword,
        role: "student",
        name: "Student User",
        isEligible: true,
        rollNo: "S12345",
        department: "Computer Science",
        year: 2,
      });
      console.log("Student created:", student.email);
    } else {
      // ensure eligible
      if (!student.isEligible) {
        student.isEligible = true;
        await student.save();
        console.log("Student eligibility updated to true for:", student.email);
      } else {
        console.log("Student already exists and eligible:", student.email);
      }
    }

    console.log("\nCredentials:");
    console.log(
      "Admin -> email: admin@example.com password: Admin123 role: admin",
    );
    console.log(
      "Student -> email: student@example.com password: Student123 role: student",
    );

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message || err);
    process.exit(1);
  }
};

seed();
