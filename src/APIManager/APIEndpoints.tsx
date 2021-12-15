export default class APIEndpoints {
    static baseUrl = 'https://slateapi.azurewebsites.net'
    static loginUrl = '/api/Auth/login'
    static emailOtpUrl = '/api/Auth/email_login_otp'
    static otpLoginUrl = '/api/Auth/otp_login'
    static checkInUrl = '/api/attendance/checkIn'
    static checkOutUrl = '/api/attendance/checkOut'
    static employeeListUrl = '/api/employee/list'
    static createTask = '/api/project/timesheet'
    static projectList = '/api/project/myproject'
    static healthQuestionUrl = '/api/health/questions'
    static healthAnswersUrl = '/api/health/questions/answer'
    static summaryUrl = '/api/attendance/summary'
    static taskTypeList = '/api/project/tasktype'
    static taskList = '/api/project/timesheet/mylist'
    static getJobs = '/api/project/openjobs';
    static getActiveJob = '/api/project/myproject';
    static allocateJob = '/api/project/allocate';
    static jobCheckIn = '/api/project/checkin';
    static jobCheckout = '/api/project/checkout';
    static getDepartments = '/api/project/department';
    static posAJob = '/api/project/create';
    static accountInfo = '/api/project/account';
    static uploadDeviceToken = '/api/project/devicetoken';
    static assessments = '/api/health/assessments';
    static uploadAssessment =  '/api/health/assessment';
}