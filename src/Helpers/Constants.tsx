
export default class Constants {
    static loginSuccess = 'Login Success'
    static otpSuccess = 'OTP sent to your email successfully'
    static emailAlertMessage = "Please enter your email"
    static passwordAlertMessage = "Please enter your password"
    static otpAlertMessage = "Please enter OTP"
    static authenticationToken: string = ""
    static taskCreateVacantMessage = 'Please enter Task name, start date, number of hours and task type filed'
    static postAJbobVacantMessage = 'Please enter job title, department name, start date and end date'
    static addEmployeeVacantMessage = 'Please enter Employee Name,Education Title, and Department'
    static taskCreated = 'Task Created successfuly'
    static jobCreated = 'Job Created successfuly'
    static success = 'Success'
    static error = 'Error'
    static ok = 'OK'
    static token = ''
    static isManager: boolean
    static isProjectView: boolean
    static projectId: string
    static isDemoAddTask: boolean
    static screening = [ 
        {
            id: 1,
            message: 'Please note that the information from this chat will be used for monitoring of any current Health crisis and to battle against a pandemic situation if there is any.',
            qustions: [],
            answerSelectionStatus: false,
             newSelectionStatus: false,
            answer:'',
        },
        {
            id:2,
            message: 'Are you experiencing any of the following symptoms?',
            qustions: [
                {
                    name: 'Fever',
                    id: 'qwerty1',
                },
                {
                    name: 'Cold & Cough',
                    id: 'qwerty2',
                }, 
                {
                    name: 'Fatique',
                    id: 'qwerty3',
                }, 
                {
                    name: 'Tiredness',
                    id: 'qwerty4',
                }, 
                {
                    name: 'Breathlessness',
                    id: 'qwerty5',
                }, 
                {
                    name: 'None of the Above',
                    id: 'qwerty6',
                }
               ],
            answerSelectionStatus: false,
             newSelectionStatus: false,
            answer:''
        }
        // {
        //     id:3,
        //     message: 'From how long have you had difficulty in Breathing?',
        //     qustions: [ 
        //     {
        //         name: '2 days',
        //         id: 'qwerty7',
        //     },
        //     {
        //         name: 'More than 1 week',
        //         id: 'qwerty8',
        //     },
        //     {
        //         name: 'More than 2 week',
        //         id: 'qwerty9',
        //     },
        //     {
        //         name: 'More than 3 week',
        //         id: 'qwerty10',
        //     },
        //     {
        //          name: 'None of the Above',
        //         id: 'qwerty11',
        //     }
        //     ],
        //     answerSelectionStatus: false,
        //     answer:''
        // },
        //  {
        //      id:4,
        //     message: 'You might have a fair threat for traeting +ve for Covid - 19. Consult a doctor immediatley',
        //     qustions: [],
        //     answerSelectionStatus: false,
        //     answer:''
        // },
        // {
        //     id:5,
        //     message: 'You are done with your Screening. You can click on Proceed to cotinue',
        //     qustions: [
        //         {
        //          name: 'Proceed',
        //          id: 'qwerty12',
        //         }
        //     ],
        //     answerSelectionStatus: false,
        //     answer:''
        // }

    ];

    static DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Big Iron',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Krimzen',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Rynly',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Magnify',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Google',
        }
    ];

      static SYMPTOMS = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Fever',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Krimzen',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Cold & Cough',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Fatigue',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Tiredness',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbed91aa97f63',
            title: 'Breathlessness',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbed91aa97f63',
            title: 'None of the Above',
        }
    ];

    static Teams = [
        {
            id:'1',
            name: 'Mantosh Kumar Mishra',
            imageUrl: 'https://slatesuitestorage.blob.core.windows.net/b1d34d35-9be8-472b-9a60-918c49874871/profile/5d5e70db-87dd-4c8f-913c-413a1f93a88e.jpg',
            designation: 'Software Engineer',
            email: 'mantoshmishra@goavega.com',
            teams: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'Big Iron',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Krimzen',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Rynly',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Magnify',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Google',
                }
            ]
        },
        {
            id:'2',
            name: 'Pranay Kumar',
            imageUrl: 'https://slatesuitestorage.blob.core.windows.net/b1d34d35-9be8-472b-9a60-918c49874871/profile/a54cc1b3-6cbf-41fc-87a3-c9d50d84d550.png',
            designation: 'Software Engineer',
            email: 'npranay@goavega.com',
            teams: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'Big Iron',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Krimzen',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Rynly',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Magnify',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Google',
                }
            ]
        },
        {
            id:'3',
            name: 'Sarat Chandra Addepali',
            imageUrl: 'https://slatesuitestorage.blob.core.windows.net/b1d34d35-9be8-472b-9a60-918c49874871/profile/372d06a0-15cf-4522-ba07-d92b7ef67e37.jpg',
            designation: 'UI/UX Designer',
            email: 'saratchandra@goavega.com',
            teams: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'Big Iron',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Krimzen',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Rynly',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Magnify',
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Google',
                }
            ]
        }
    ]
    static isAppoinmentAppSelected: false
    static TeamMateName: ''
    static TeamMateDesignation: ''
    static TeamMateEmail: ''
    static TeamMateImage: ''
}