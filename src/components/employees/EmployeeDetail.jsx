import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function EmployeeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state?.employee;

  if (!employee) {
    return (
      <div className="p-10">
        <p>No employee data found.</p>
        <button
          onClick={() => navigate("/employees")}
          className="text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen bg-[#f7f8fc]
        pt-[65px] 
        pl-0 md:pl-[250px] 
        pr-0 
        flex justify-center
      "
    >
      <div
        className="
          bg-white shadow-xl rounded-none md:rounded-2xl  
          p-6 md:p-10 
          w-full 
          max-w-full      /* 🔥 Laptop FULL WIDTH */
          md:mx-6         /* 🔥 Side gap कमी पण perfect */
        "
      >

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Employee Profile — {employee.firstName} {employee.lastName}
        </h1>

        {/* PROFILE SECTION */}
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.firstName}`}
            className="w-36 h-36 rounded-full shadow-md"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 flex-1">
            <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Contact:</strong> {employee.contact}</p>
            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
            <p><strong>Username:</strong> {employee.username}</p>
          </div>
        </div>

        {/* ADDRESS */}
        <h2 className="text-xl font-semibold text-blue-600 mb-3">Address</h2>
        <p className="text-gray-700 mb-10">{employee.address}</p>

        {/* BANK DETAILS */}
        <h2 className="text-xl font-semibold text-blue-600 mb-3">Bank Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-12">
          <p><strong>Account Holder:</strong> {employee.accountName}</p>
          <p><strong>Account Number:</strong> {employee.accountNumber}</p>
          <p><strong>Bank:</strong> {employee.bankName}</p>
          <p><strong>Branch:</strong> {employee.branchName}</p>
        </div>

        {/* WORK INFORMATION */}
        <h2 className="text-xl font-semibold text-blue-600 mb-3">Work Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-12">
          <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
          <p><strong>Shift Timing:</strong> 9:30 AM – 6:30 PM</p>
          <p><strong>Work Location:</strong> Hinjawadi Phase 2, Pune</p>
          <p><strong>Reporting Manager:</strong> Rahul Sharma</p>
        </div>

        {/* PROJECT ASSIGNMENTS */}
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          Project Assignments
        </h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-10">
          <li>
            <strong>Project:</strong> HROne Automation System  
            <br />
            <span className="text-sm text-gray-600">Role: UI Developer</span>
          </li>

          <li>
            <strong>Project:</strong> E-Commerce Admin Panel  
            <br />
            <span className="text-sm text-gray-600">Role: Frontend Developer</span>
          </li>

          <li>
            <strong>Project:</strong> Employee Payroll Dashboard  
            <br />
            <span className="text-sm text-gray-600">Role: Data Integration Engineer</span>
          </li>
        </ul>

      </div>
    </div>
  );
}
