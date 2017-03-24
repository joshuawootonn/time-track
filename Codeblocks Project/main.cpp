#include <iostream>
#include <cstdlib>
#define _WIN32_WINNT 0x0500
#include <windows.h>
#include <conio.h>
#include <string>
#include <limits>
#include <fstream>
#include <ctime>
#include <algorithm>
#include <iterator>


#include <iomanip>
#include <locale>
#include <sstream>

using namespace std;


#include "Date.h"
#include "Shift.h"
#include "Records.h"

bool AdminMenu(int id);
int EmployeeMenu(int id);
void printInfo(int id);
int findEmptySpot();
int numberOfEmployees();
void addEmployee();
void printEmployeeList();
void generateEmployees();
void degenerateEmployees();
void writeToCsv(string x);
void rememberShifts();
void saveShifts();
void clockIn(int placeInArray,Date currentDate);
void clockOut(int placeInArray,Date currentDate);
void beginWeek();
void beginWeekAuto();
void beginDay();



string ExcelFileName;
Date blankDate(1,1,1900,0,0);
bool started;
Shift blankShift;

struct employee{
    string name;
    bool adminStatus;
    int id;
    double wage;
    Records  r;
    int shiftCount;
};
typedef struct employee Employee;
Employee data[100];

ifstream employeeList ("employeeList.txt");
int main(int argc, char* argv[])
{
    //::SendMessage(::GetConsoleWindow(), WM_SYSKEYDOWN, VK_RETURN, 0x20000000);

    bool x = true;
    if (employeeList.is_open())
    {
        generateEmployees();
        employeeList.close();
    }
    else
        cout << "Unable to open file";


    while(x)
    {
        int input,i=0;
        bool val=false;
        beginDay();
        while(!val)
        {
            cout<< "Enter your 4 digit id: ";
            cin>> input;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            i=0;
            while(i<100)
            {
                if(input==data[i].id)
                    val=true;
                i++;
            }
            if(!val)
            {
                cout<< "Invalid ID. Try again please.";
                getch();
            }
            std::system("cls");
        }


        ifstream Fresh ("Fresh.txt");
        if (Fresh.is_open())
        {
            Fresh>>started;
            Fresh.close();

        }
        else
            cout << "Unable to open file";
        time_t now = time(0); // get current time
        struct tm* tm = localtime(&now);

        if(tm->tm_wday==1||tm->tm_wday==2)
        {
             if(started ==false)
            {
                beginWeek();
                ofstream Fresho("Fresh.txt",ios::trunc);
                Fresho << "true";
                Fresho.close();
            }

        }
        if(tm->tm_wday==4||tm->tm_wday==5)
        {
            ofstream Fresho("Fresh.txt",ios::trunc);
            Fresho << "false";
            Fresho.close();
        }

        i=0;
        while(data[i].id!=input)
            i++;


        if(data[i].adminStatus ==true)
            x = AdminMenu(i);
        else
            EmployeeMenu(i);

    }
    employeeList.close();
    degenerateEmployees();
    return 0;
}
bool AdminMenu(int placeInArray)
{
    while(true)
    {
        std::system("cls");
        int input=0;
        cout<<"You are in the admin menu\n1. Print My info\n2. Print EmployeeList\n3. Edit Employee/Shifts\n4. Clock In\n5. Clock Out\n6. Begin Week(Monday Morning)\n7. Finish Session\n8. Close Program"<<endl;
        cin>> input;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        if(input<1||input>9)
        {
            cout<< "Invalid input. Try again please."<<endl;
            Sleep(1000);
            std::system("cls");
        }
        else if(input==1)
        {
            std::system("cls");
            printInfo(placeInArray);
            cout<< "\n\nPress any key to continue.";
            getch();
            std::system("cls");
        }
        else if (input ==3)
        {
            std::system("cls");
            int placeToEdit, whatToEdit, whatWeAreDoing;

            bool kicker =false;
            while(!kicker)
            {
                cout <<"Are you: \n0. Adding an Employee?\n1. Editing an Employee?\n2. Deleting an Employee?\n3. Go Back";
                cin>> whatWeAreDoing;
                if (whatWeAreDoing==0)
                {
                    addEmployee();
                    degenerateEmployees();
                    kicker =true;
                }
                else if (whatWeAreDoing==1)
                {
                    kicker =false;
                    while(!kicker)
                    {
                        cout << "Please look at the list of employees below and enter the number of the employee you would like to edit";
                        printEmployeeList();
                        cin>> placeToEdit;
                        if(placeToEdit<numberOfEmployees()&&placeToEdit>=0)
                            kicker=true;
                        else
                            cout<<"Invalid input. Try again.";
                    }
                    std::system("cls");
                    kicker =false;
                    while(!kicker)
                    {
                        cout<< "What do you want to change? \n1. Name\n2. ID\n3. Admin Status\n4. Wage\n5. Clock In/Out";
                        cin>> whatToEdit;
                        if(whatToEdit<6&&whatToEdit>0)
                            kicker =true;
                        else
                            cout<<"Invalid input. Try again.";
                    }
                    if(whatToEdit==1)
                    {
                        std::system("cls");
                        cout<<"Enter the employee's new name: ";
                        cin >> data[placeToEdit].name;
                        cout<< "\nEmployee's name adjusted successfully.";
                        cout<< "\n\nPress any key to continue.";
                        getch();
                    }
                    else if(whatToEdit==2)
                    {
                        kicker =false;
                        while(!kicker)
                        {
                            std::system("cls");
                            cout<<"Enter the employee's new ID: ";
                            cin >> data[placeToEdit].id;
                            unsigned int number_of_digits = 0;
                            int n=data[placeToEdit].id;
                            int i =0, j=0;
                            do
                            {
                                 ++number_of_digits;
                                 n /= 10;
                            } while (n);

                            while(i<100)
                            {
                                if(data[placeToEdit].id==data[i].id)
                                   j++;
                                i++;
                            }
                            if(number_of_digits!=4 || j>1)
                            {
                               cout<<"\n Invalid ID. Make sure the new ID is not already in use and is only four characters in length.\n";

                            }
                            else
                            {
                                cout<< "\nEmployee's ID adjusted successfully.";
                                cout<< "\n\nPress any key to continue.";
                                getch();
                                kicker=true;
                            }

                        }
                    }
                    else if(whatToEdit == 3)
                    {

                        std::system("cls");
                        kicker =false;
                        while(!kicker)
                        {
                            int input;

                            cout<<" Enter the employee's admin status:(0 for regular employees and 1 for admins)";
                            cin >> input;
                            if(input<2&&input>-1)
                            {
                                data[placeToEdit].adminStatus=input;
                                kicker=true;
                            }
                            else
                                cout<< " Invalid admin status. Try again.\n";
                        }

                        cout<< "\nEmployee's Admin status adjusted successfully.";
                        cout<< "\n\nPress any key to continue.";
                        getch();
                    }
                    else if(whatToEdit == 4)
                    {
                        std::system("cls");
                        kicker =false;
                        while(!kicker)
                        {

                            cout<<"Enter the employee's new wage: ";
                            cin >> data[placeToEdit].wage;
                            if(data[placeToEdit].wage<0||data[placeToEdit].wage>100)
                            {
                                cout<<"Invalid input. Try again.\n";
                            }
                            else
                                kicker=true;
                        }
                        cout<< "\nEmployee's wage adjusted successfully.";
                        cout<< "\n\nPress any key to continue.";
                        getch();
                    }
                    else if(whatToEdit == 5)
                    {
                        std::system("cls");
                        int status,month,day,year,hour,minute;
                        cout<<"Would you like to clock them in, out, or both?(0,1, or 2)\n";

                        printInfo(placeToEdit);
                        cin >> status;
                        if(status==0)
                        {
                            std::system("cls");
                            cout<<"Enter the time:\nFor example: 8 20(hour minute)";
                            cin>>hour>>minute;
                            cout<<"Enter the date:\nFor example: 1 1 2000(month day year)";
                            cin>>month>>day>>year;

                            Date currentDate(month-1,day,year,hour,minute);
                            clockIn(placeToEdit,currentDate);
                        }
                        else if(status==1)
                        {
                            std::system("cls");
                            cout<<"Enter the time:\nFor example: 8 20(hour minute)";
                            cin>>hour>>minute;
                            cout<<"Enter the date:\nFor example: 1 1 2000(month day year)";
                            cin>>month>>day>>year;

                            Date currentDate(month-1,day,year,hour,minute);
                            clockOut(placeToEdit,currentDate);
                        }
                        else
                        {
                            std::system("cls");
                            cout<<"Enter the time:\nFor example: 8 20(hour minute)";
                            cin>>hour>>minute;
                            cout<<"Enter the date:\nFor example: 1 1 2000(month day year)";
                            cin>>month>>day>>year;

                            Date inDate(month-1,day,year,hour,minute);
                            clockIn(placeToEdit,inDate);

                            cout<<"Enter the time:\nFor example: 8 20(hour minute)";
                            cin>>hour>>minute;
                            cout<<"Enter the date:\nFor example: 1 1 2000(month day year)";
                            cin>>month>>day>>year;

                            Date outDate(month-1,day,year,hour,minute);
                            clockOut(placeToEdit,outDate);
                        }

                    }

                    degenerateEmployees();
                    kicker=true;
                }
                else if (whatWeAreDoing==2)
                {
                    std::system("cls");
                    kicker =false;
                    while(!kicker)
                    {
                        int placeToEdit;
                        cout << "Please look at the list of employees below and enter the number of the employee you would like to delete";
                        printEmployeeList();
                        cin>> placeToEdit;

                        if( data[placeToEdit].id!= 0)
                        {
                            data[placeToEdit].name = '\0';
                            data[placeToEdit].id = '\0';
                            data[placeToEdit].adminStatus='\0';
                            cout<< "\nEmployee successfully deleted.";
                            cout<< "\n\nPress any key to continue.";
                            getch();
                            kicker=true;
                        }
                        else
                            cout<< "Error: invalid input.\n";
                    }
                    kicker=true;
                }
                else if (whatWeAreDoing==3)
                {
                    kicker =true;
                }
                else
                {
                    cout<< "\nError: invalid input.\n";
                    Sleep(1000);
                    std::system("cls");
                }
            }

        }
        else if(input ==2)
        {
            printEmployeeList();
            cout<< "\n\nPress any key to continue.";
            getch();
        }
        else if (input == 4)
        {
            time_t now = time(0); // get current time
            struct tm* tm = localtime(&now);

            Date currentDate(tm->tm_mon,tm->tm_mday,tm->tm_year+1900,tm->tm_hour,tm->tm_min);
            clockIn(placeInArray,currentDate);
            std::system("cls");
            cout<< "Successfully clocked in at ";
            currentDate.Date::print();
            cout<< "\n\nPress any key to continue.";
            getch();
        }
        else if (input == 5)
        {
            time_t now = time(0); // get current time
            struct tm* tm = localtime(&now);

            Date currentDate(tm->tm_mon,tm->tm_mday,tm->tm_year+1900,tm->tm_hour,tm->tm_min);
            clockOut(placeInArray,currentDate);

            std::system("cls");
            cout<< "Successfully clocked out at ";
            currentDate.Date::print();
            cout<< "\n\nPress any key to continue.";
            getch();
        }
        else if(input ==8)
        {
            saveShifts();
            string x = "Excel Files\\"+ExcelFileName+".csv";
            writeToCsv(x);
            Sleep(100);
            std::system("cls");
            return false;
        }
        else if(input ==7)
        {
            saveShifts();
            string x = "Excel Files\\"+ExcelFileName+".csv";
            writeToCsv(x);
            Sleep(100);
            std::system("cls");
            return true;
        }
        else if(input==6)
        {
            beginWeek();
            std::system("cls");
            cout<< "Save successful!\nPress any key to continue.";
            getch();
        }


    }



}
int EmployeeMenu(int placeInArray)
{
    int input;
    while(true)
    {

        std::system("cls");
        cout<< "You are in the Employee Menu\n1. Print My info\n2. Clock in\n3. Clock out\n9. Finish";
        cin>> input;
        std::system("cls");
        if(input<1||input>9)
        {
            cout<< "Invalid input please try again"<<endl;
            Sleep(1000);
            std::system("cls");
        }
        else if(input==1)
        {
            printInfo(placeInArray);
            cout<< "\n\nPress any key to continue.";
            getch();
        }

        else if (input == 2)
        {
           time_t now = time(0); // get current time
            struct tm* tm = localtime(&now);

            Date currentDate(tm->tm_mon,tm->tm_mday,tm->tm_year+1900,tm->tm_hour,tm->tm_min);
            clockIn(placeInArray,currentDate);
            std::system("cls");
            cout<< "Successfully clocked out at ";
            currentDate.Date::print();
            cout<< "\n\nPress any key to continue.";
            getch();
        }
        else if (input == 3)
        {
           time_t now = time(0); // get current time
            struct tm* tm = localtime(&now);

            Date currentDate(tm->tm_mon,tm->tm_mday,tm->tm_year+1900,tm->tm_hour,tm->tm_min);
            clockOut(placeInArray,currentDate);
            std::system("cls");
            cout<< "Successfully clocked out at ";
            currentDate.Date::print();
            cout<< "\n\nPress any key to continue.";
            getch();
        }
        else if(input ==9)
        {
            saveShifts();
            string x = "Excel Files\\"+ExcelFileName+".csv";
            writeToCsv(x);
            std::system("cls");
            return 0;
        }
    }


}
void printInfo(int placeInArray)
{
    cout<<"Name: "<<data[placeInArray].name<<endl;
    cout<<"ID: "<<data[placeInArray].id<<endl;
    cout<<"Admin status: "<< data[placeInArray].adminStatus<<""<<endl;
    cout<<"Wage: "<< data[placeInArray].wage<<""<<endl;
    data[placeInArray].r.Records::print();
}
int findEmptySpot()
{
     int i=0;
     while(data[i].id!=0)
            i++;
     return i;
}
int numberOfEmployees()
{
    int i =0,j=0;
    while(j<100)
    {
        if(data[j].id!=0)
            i++;
        j++;
    }
    return i;
}

void printEmployeeList()
{
    std::system("cls");
    int x;
    for( x = 0; x<100; x++)
    {
        if( data[x].id!=0)
            cout<<"\n"<<x<<". "<<data[x].name<<endl;
    }
}
void addEmployee()
{
    int newPlace = findEmptySpot();
    std::system("cls");
    cout<<" Enter the employee's name: ";
    cin >> data[newPlace].name;
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    bool kicker =false;
    while(!kicker)
    {
        cout<<" Enter the employee's ID: ";
        cin >> data[newPlace].id;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');


        unsigned int number_of_digits = 0;
        int n=data[newPlace].id;
        int i =0, j=0;
        do
        {
             ++number_of_digits;
             n /= 10;
        } while (n);

        while(i<100)
        {
            if(data[newPlace].id==data[i].id)
               j++;
            i++;
        }
        if(number_of_digits!=4 || j>1)
        {
           cout<<" Invalid ID. Make sure the new ID is not already in use and is only four characters in length.\n";

        }
        else
        {
            kicker=true;
        }

    }
    kicker =false;
    while(!kicker)
    {
        int input;

        cout<<" Enter the employee's admin status:(0 for regular employees and 1 for admins)";
        cin >> input;
        if(input<2&&input>-1)
        {
            data[newPlace].adminStatus=input;
            kicker=true;
        }
        else
            cout<< " Invalid admin status. Try again.\n";
    }


    data[newPlace].shiftCount =1;
    std::system("cls");
    cout<< "Your new employee profile has been created!";
    printInfo(newPlace);
    cout<< "\n Press any key to continue.";
    getch();
}
void generateEmployees()
{
        string n;
        bool a;
        int i, w,sc, j =0;
        while (employeeList >>n>>i>>a>>w>>sc)
        {
            data[j].name=n;
            data[j].adminStatus=a;
            data[j].id=i;
            data[j].wage=w;
            data[j].shiftCount=sc;
            j++;
        }
}
void degenerateEmployees()
{
    ofstream employeeList("employeeList.txt",ios::trunc);
    int x;
    for( x = 0; x<100; ++x)
    {
        if( data[x].id!=0)
            employeeList<< data[x].name<< " "<< data[x].id<< " "<< data[x].adminStatus<< " "<<data[x].wage<<" "<<data[x].shiftCount<<"\n";
    }
    employeeList<< "End 0 0 0 0";
    employeeList.close();

}
void writeToCsv(string x)
{
    ofstream myfile;
    int i =0;
    const char *result = x.c_str();
    myfile.open (result);
    while(data[i].name !="End")
    {

        myfile << "Employee: ,,"<< data[i].name;
        myfile << "\nWage:,, "<< data[i].wage<< "\n\nDate: ,";
        if(data[i].r.getOne().getBeginOfShift().getYear()!=1900)
            myfile<<data[i].r.getOne().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getOne().getBeginOfShift().getDay()<<"/"<<data[i].r.getOne().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getTwo().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwo().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getTwo().getBeginOfShift().getDay()<<"/"<<data[i].r.getTwo().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getThree().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThree().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getThree().getBeginOfShift().getDay()<<"/"<<data[i].r.getThree().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getFour().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFour().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getFour().getBeginOfShift().getDay()<<"/"<<data[i].r.getFour().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getFive().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFive().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getFive().getBeginOfShift().getDay()<<"/"<<data[i].r.getFive().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getSix().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSix().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getSix().getBeginOfShift().getDay()<<"/"<<data[i].r.getSix().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getSeven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSeven().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getSeven().getBeginOfShift().getDay()<<"/"<<data[i].r.getSeven().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getEight().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEight().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getEight().getBeginOfShift().getDay()<<"/"<<data[i].r.getEight().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getNine().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getNine().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getNine().getBeginOfShift().getDay()<<"/"<<data[i].r.getNine().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getTen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTen().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getTen().getBeginOfShift().getDay()<<"/"<<data[i].r.getTen().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getEleven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEleven().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getEleven().getBeginOfShift().getDay()<<"/"<<data[i].r.getEleven().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getTwelve().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwelve().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getTwelve().getBeginOfShift().getDay()<<"/"<<data[i].r.getTwelve().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getThirteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThirteen().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getThirteen().getBeginOfShift().getDay()<<"/"<<data[i].r.getThirteen().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getFourteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFourteen().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getFourteen().getBeginOfShift().getDay()<<"/"<<data[i].r.getFourteen().getBeginOfShift().getYear()<<"\t";
        if(data[i].r.getFifteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFifteen().getBeginOfShift().getMonth()+1<<"/"<<data[i].r.getFifteen().getBeginOfShift().getDay()<<"/"<<data[i].r.getFifteen().getBeginOfShift().getYear()<<"\t";


        myfile<< "\n\nClock In: ,";
        if(data[i].r.getOne().getBeginOfShift().getYear()!=1900)
            myfile<<data[i].r.getOne().getBeginOfShift().getHour()<<":"<<data[i].r.getOne().getBeginOfShift().getMinute();
        if(data[i].r.getTwo().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwo().getBeginOfShift().getHour()<<":"<<data[i].r.getTwo().getBeginOfShift().getMinute();
        if(data[i].r.getThree().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThree().getBeginOfShift().getHour()<<":"<<data[i].r.getThree().getBeginOfShift().getMinute();
        if(data[i].r.getFour().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFour().getBeginOfShift().getHour()<<":"<<data[i].r.getFour().getBeginOfShift().getMinute();
        if(data[i].r.getFive().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFive().getBeginOfShift().getHour()<<":"<<data[i].r.getFive().getBeginOfShift().getMinute();
        if(data[i].r.getSix().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSix().getBeginOfShift().getHour()<<":"<<data[i].r.getSix().getBeginOfShift().getMinute();
        if(data[i].r.getSeven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSeven().getBeginOfShift().getHour()<<":"<<data[i].r.getSeven().getBeginOfShift().getMinute();
        if(data[i].r.getEight().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEight().getBeginOfShift().getHour()<<":"<<data[i].r.getEight().getBeginOfShift().getMinute();
        if(data[i].r.getNine().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getNine().getBeginOfShift().getHour()<<":"<<data[i].r.getNine().getBeginOfShift().getMinute();
        if(data[i].r.getTen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTen().getBeginOfShift().getHour()<<":"<<data[i].r.getTen().getBeginOfShift().getMinute();
        if(data[i].r.getEleven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEleven().getBeginOfShift().getHour()<<":"<<data[i].r.getEleven().getBeginOfShift().getMinute();
        if(data[i].r.getTwelve().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwelve().getBeginOfShift().getHour()<<":"<<data[i].r.getTwelve().getBeginOfShift().getMinute();
        if(data[i].r.getThirteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThirteen().getBeginOfShift().getHour()<<":"<<data[i].r.getThirteen().getBeginOfShift().getMinute();
        if(data[i].r.getFourteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFourteen().getBeginOfShift().getHour()<<":"<<data[i].r.getFourteen().getBeginOfShift().getMinute();
        if(data[i].r.getFifteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFifteen().getBeginOfShift().getHour()<<":"<<data[i].r.getFifteen().getBeginOfShift().getMinute();

        myfile<< "\nClock Out: ,";
        if(data[i].r.getOne().getBeginOfShift().getYear()!=1900)
            myfile<<data[i].r.getOne().getEndOfShift().getHour()<<":"<<data[i].r.getOne().getEndOfShift().getMinute();
        if(data[i].r.getTwo().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwo().getEndOfShift().getHour()<<":"<<data[i].r.getTwo().getEndOfShift().getMinute();
        if(data[i].r.getThree().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThree().getEndOfShift().getHour()<<":"<<data[i].r.getThree().getEndOfShift().getMinute();
        if(data[i].r.getFour().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFour().getEndOfShift().getHour()<<":"<<data[i].r.getFour().getEndOfShift().getMinute();
        if(data[i].r.getFive().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFive().getEndOfShift().getHour()<<":"<<data[i].r.getFive().getEndOfShift().getMinute();
        if(data[i].r.getSix().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSix().getEndOfShift().getHour()<<":"<<data[i].r.getSix().getEndOfShift().getMinute();
        if(data[i].r.getSeven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSeven().getEndOfShift().getHour()<<":"<<data[i].r.getSeven().getEndOfShift().getMinute();
        if(data[i].r.getEight().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEight().getEndOfShift().getHour()<<":"<<data[i].r.getEight().getEndOfShift().getMinute();
        if(data[i].r.getNine().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getNine().getEndOfShift().getHour()<<":"<<data[i].r.getNine().getEndOfShift().getMinute();
        if(data[i].r.getTen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTen().getEndOfShift().getHour()<<":"<<data[i].r.getTen().getEndOfShift().getMinute();
        if(data[i].r.getEleven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEleven().getEndOfShift().getHour()<<":"<<data[i].r.getEleven().getEndOfShift().getMinute();
        if(data[i].r.getTwelve().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwelve().getEndOfShift().getHour()<<":"<<data[i].r.getTwelve().getEndOfShift().getMinute();
        if(data[i].r.getThirteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThirteen().getEndOfShift().getHour()<<":"<<data[i].r.getThirteen().getEndOfShift().getMinute();
        if(data[i].r.getFourteen().getBeginOfShift().getYear()!=1900)
           myfile<<","<<data[i].r.getFourteen().getEndOfShift().getHour()<<":"<<data[i].r.getFourteen().getEndOfShift().getMinute();
        if(data[i].r.getFifteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFifteen().getEndOfShift().getHour()<<":"<<data[i].r.getFifteen().getEndOfShift().getMinute();

        myfile<< "\nLength: ,";
        if(data[i].r.getOne().getBeginOfShift().getYear()!=1900)
            myfile<<data[i].r.getOne().getLength().getHour()<<":"<<data[i].r.getOne().getLength().getMinute();
        if(data[i].r.getTwo().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwo().getLength().getHour()<<":"<<data[i].r.getTwo().getLength().getMinute();
        if(data[i].r.getThree().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThree().getLength().getHour()<<":"<<data[i].r.getThree().getLength().getMinute();
        if(data[i].r.getFour().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFour().getLength().getHour()<<":"<<data[i].r.getFour().getLength().getMinute();
        if(data[i].r.getFive().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFive().getLength().getHour()<<":"<<data[i].r.getFive().getLength().getMinute();
        if(data[i].r.getSix().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSix().getLength().getHour()<<":"<<data[i].r.getSix().getLength().getMinute();
        if(data[i].r.getSeven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getSeven().getLength().getHour()<<":"<<data[i].r.getSeven().getLength().getMinute();
        if(data[i].r.getEight().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEight().getLength().getHour()<<":"<<data[i].r.getEight().getLength().getMinute();
        if(data[i].r.getNine().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getNine().getLength().getHour()<<":"<<data[i].r.getNine().getLength().getMinute();
        if(data[i].r.getTen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTen().getLength().getHour()<<":"<<data[i].r.getTen().getLength().getMinute();
        if(data[i].r.getEleven().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getEleven().getLength().getHour()<<":"<<data[i].r.getEleven().getLength().getMinute();
        if(data[i].r.getTwelve().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getTwelve().getLength().getHour()<<":"<<data[i].r.getTwelve().getLength().getMinute();
        if(data[i].r.getThirteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getThirteen().getLength().getHour()<<":"<<data[i].r.getThirteen().getLength().getMinute();
        if(data[i].r.getFourteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFourteen().getLength().getHour()<<":"<<data[i].r.getFourteen().getLength().getMinute();
        if(data[i].r.getFifteen().getBeginOfShift().getYear()!=1900)
            myfile<<","<<data[i].r.getFifteen().getLength().getHour()<<":"<<data[i].r.getFifteen().getLength().getMinute();


        myfile<< "\n Total Length: ,";
        int totalMinutes=0;
        if(data[i].r.getOne().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getOne().getLengthMinutes();
        if(data[i].r.getTwo().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getTwo().getLengthMinutes();
        if(data[i].r.getThree().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getThree().getLengthMinutes();
        if(data[i].r.getFour().getBeginOfShift().getYear()!=1900)
           totalMinutes+=data[i].r.getFour().getLengthMinutes();
        if(data[i].r.getFive().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getFive().getLengthMinutes();
        if(data[i].r.getSix().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getSix().getLengthMinutes();
        if(data[i].r.getSeven().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getSeven().getLengthMinutes();
        if(data[i].r.getEight().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getEight().getLengthMinutes();
        if(data[i].r.getNine().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getNine().getLengthMinutes();
        if(data[i].r.getTen().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getTen().getLengthMinutes();
        if(data[i].r.getEleven().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getEleven().getLengthMinutes();
        if(data[i].r.getTwelve().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getTwelve().getLengthMinutes();
        if(data[i].r.getThirteen().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getThirteen().getLengthMinutes();
        if(data[i].r.getFourteen().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getFourteen().getLengthMinutes();
        if(data[i].r.getFifteen().getBeginOfShift().getYear()!=1900)
            totalMinutes+=data[i].r.getFifteen().getLengthMinutes();

        int hours=totalMinutes/60;
        int minutes=totalMinutes%60;
        myfile<<","<<hours<<":"<<minutes;

        myfile<<"\n------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,------------,\n";
        i++;
    }
    myfile.close();
}
void rememberShifts()//same as generating employees
{
        /*
    for(int x = 0; x<100;x++)
    {
        data[x].name = '\0';
        data[x].id = '\0';
        data[x].adminStatus='\0';
        data[x].wage = '\0';
        data[x].r.Records::setBlank();

    }

    generateEmployees();*/

    ifstream shiftList ("shiftList.txt");

    //int i;
    if (shiftList.is_open())
    {
        int id, m1,d1,y1,h1,M1,m2,d2,y2,h2,M2,m3,d3,y3,h3,M3;
        for(int i=0;i<numberOfEmployees();i++)
        {

            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            /*i=0;
            while(data[i].id!=id)
                i++;*/
            Date D1(m1,d1,y1,h1,M1);
            Date D2(m2,d2,y2,h2,M2);
            Date D3(m3,d3,y3,h3,M3);
            data[i].r.one.Shift::setAll(D1,D2,D3);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D4(m1,d1,y1,h1,M1);
            Date D5(m2,d2,y2,h2,M2);
            Date D6(m3,d3,y3,h3,M3);
            data[i].r.two.Shift::setAll(D4,D5,D6);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D7(m1,d1,y1,h1,M1);
            Date D8(m2,d2,y2,h2,M2);
            Date D9(m3,d3,y3,h3,M3);
            data[i].r.three.Shift::setAll(D7,D8,D9);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D10(m1,d1,y1,h1,M1);
            Date D11(m2,d2,y2,h2,M2);
            Date D12(m3,d3,y3,h3,M3);
            data[i].r.four.Shift::setAll(D10,D11,D12);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D13(m1,d1,y1,h1,M1);
            Date D14(m2,d2,y2,h2,M2);
            Date D15(m3,d3,y3,h3,M3);
            data[i].r.five.Shift::setAll(D13,D14,D15);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D16(m1,d1,y1,h1,M1);
            Date D17(m2,d2,y2,h2,M2);
            Date D18(m3,d3,y3,h3,M3);
            data[i].r.six.Shift::setAll(D16,D17,D18);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D19(m1,d1,y1,h1,M1);
            Date D20(m2,d2,y2,h2,M2);
            Date D21(m3,d3,y3,h3,M3);
            data[i].r.seven.Shift::setAll(D19,D20,D21);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D22(m1,d1,y1,h1,M1);
            Date D23(m2,d2,y2,h2,M2);
            Date D24(m3,d3,y3,h3,M3);
            data[i].r.eight.Shift::setAll(D22,D23,D24);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D25(m1,d1,y1,h1,M1);
            Date D26(m2,d2,y2,h2,M2);
            Date D27(m3,d3,y3,h3,M3);
            data[i].r.nine.Shift::setAll(D25,D26,D27);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D28(m1,d1,y1,h1,M1);
            Date D29(m2,d2,y2,h2,M2);
            Date D30(m3,d3,y3,h3,M3);
            data[i].r.ten.Shift::setAll(D28,D29,D30);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D31(m1,d1,y1,h1,M1);
            Date D32(m2,d2,y2,h2,M2);
            Date D33(m3,d3,y3,h3,M3);
            data[i].r.eleven.Shift::setAll(D31,D32,D33);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D34(m1,d1,y1,h1,M1);
            Date D35(m2,d2,y2,h2,M2);
            Date D36(m3,d3,y3,h3,M3);
            data[i].r.twelve.Shift::setAll(D34,D35,D36);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D37(m1,d1,y1,h1,M1);
            Date D38(m2,d2,y2,h2,M2);
            Date D39(m3,d3,y3,h3,M3);
            data[i].r.thirteen.Shift::setAll(D37,D38,D39);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D40(m1,d1,y1,h1,M1);
            Date D41(m2,d2,y2,h2,M2);
            Date D42(m3,d3,y3,h3,M3);
            data[i].r.fourteen.Shift::setAll(D40,D41,D42);
            shiftList>>id>>m1>>d1>>y1>>h1>>M1>>m2>>d2>>y2>>h2>>M2>>m3>>d3>>y3>>h3>>M3;
            Date D43(m1,d1,y1,h1,M1);
            Date D44(m2,d2,y2,h2,M2);
            Date D45(m3,d3,y3,h3,M3);
            data[i].r.fifteen.Shift::setAll(D43,D44,D45);

        }

        employeeList.close();
    }
    else
        cout << "Unable to open file";


}
void saveShifts()//same as degenerating employees
{
    ofstream shiftList ("shiftList.txt");

     if (shiftList.is_open())
    {
        int i;

        for( i = 0; i<100; ++i)
        {
            if( data[i].id!=0)
            {

                shiftList<< data[i].id<<" ";
                shiftList<< data[i].r.one.getBeginOfShift().asAString()<<" "<<data[i].r.one.getEndOfShift().asAString()<<" "<<data[i].r.one.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.two.getBeginOfShift().asAString()<<" "<<data[i].r.two.getEndOfShift().asAString()<<" "<<data[i].r.two.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.three.getBeginOfShift().asAString()<<" "<<data[i].r.three.getEndOfShift().asAString()<<" "<<data[i].r.three.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.four.getBeginOfShift().asAString()<<" "<<data[i].r.four.getEndOfShift().asAString()<<" "<<data[i].r.four.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.five.getBeginOfShift().asAString()<<" "<<data[i].r.five.getEndOfShift().asAString()<<" "<<data[i].r.five.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.six.getBeginOfShift().asAString()<<" "<<data[i].r.six.getEndOfShift().asAString()<<" "<<data[i].r.six.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.seven.getBeginOfShift().asAString()<<" "<<data[i].r.seven.getEndOfShift().asAString()<<" "<<data[i].r.seven.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.eight.getBeginOfShift().asAString()<<" "<<data[i].r.eight.getEndOfShift().asAString()<<" "<<data[i].r.eight.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.nine.getBeginOfShift().asAString()<<" "<<data[i].r.nine.getEndOfShift().asAString()<<" "<<data[i].r.nine.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.ten.getBeginOfShift().asAString()<<" "<<data[i].r.ten.getEndOfShift().asAString()<<" "<<data[i].r.ten.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.eleven.getBeginOfShift().asAString()<<" "<<data[i].r.eleven.getEndOfShift().asAString()<<" "<<data[i].r.eleven.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.twelve.getBeginOfShift().asAString()<<" "<<data[i].r.twelve.getEndOfShift().asAString()<<" "<<data[i].r.twelve.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.thirteen.getBeginOfShift().asAString()<<" "<<data[i].r.thirteen.getEndOfShift().asAString()<<" "<<data[i].r.thirteen.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.fourteen.getBeginOfShift().asAString()<<" "<<data[i].r.fourteen.getEndOfShift().asAString()<<" "<<data[i].r.fourteen.getLength().asAString()<< " ";
                shiftList<< "\n"<<data[i].id<<" ";
                shiftList<< data[i].r.fifteen.getBeginOfShift().asAString()<<" "<<data[i].r.fifteen.getEndOfShift().asAString()<<" "<<data[i].r.fifteen.getLength().asAString()<< " ";
                shiftList<< "\n\n";
            }
        }



        shiftList.close();
    }
    else
        cout << "Unable to open file";
}
void clockIn(int placeInArray,Date currentDate)
{

    if(data[placeInArray].shiftCount == 1)
    {
        data[placeInArray].r.one.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 2)
    {
        data[placeInArray].r.two.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 3)
    {
        data[placeInArray].r.three.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 4)
    {
        data[placeInArray].r.four.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 5)
    {
        data[placeInArray].r.five.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 6)
    {
        data[placeInArray].r.six.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 7)
    {
        data[placeInArray].r.seven.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 8)
    {
        data[placeInArray].r.eight.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 9)
    {
        data[placeInArray].r.nine.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 10)
    {
        data[placeInArray].r.ten.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 11)
    {
        data[placeInArray].r.eleven.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 12)
    {
        data[placeInArray].r.twelve.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 13)
    {
        data[placeInArray].r.thirteen.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 14)
    {
        data[placeInArray].r.fourteen.Shift::setBeginOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 15)
    {
        data[placeInArray].r.fifteen.Shift::setBeginOFShift(currentDate);
    }
    saveShifts();
}
void clockOut(int placeInArray,Date currentDate)
{
    if(data[placeInArray].shiftCount == 1)
    {
        data[placeInArray].r.one.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 2)
    {
        data[placeInArray].r.two.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 3)
    {
        data[placeInArray].r.three.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 4)
    {
        data[placeInArray].r.four.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 5)
    {
        data[placeInArray].r.five.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 6)
    {
        data[placeInArray].r.six.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 7)
    {
        data[placeInArray].r.seven.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 8)
    {
        data[placeInArray].r.eight.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 9)
    {
        data[placeInArray].r.nine.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 10)
    {
        data[placeInArray].r.ten.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 11)
    {
        data[placeInArray].r.eleven.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 12)
    {
        data[placeInArray].r.twelve.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 13)
    {
        data[placeInArray].r.thirteen.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 14)
    {
        data[placeInArray].r.fourteen.Shift::setEndOFShift(currentDate);
    }
    else if(data[placeInArray].shiftCount == 15)
    {
        data[placeInArray].r.fifteen.Shift::setEndOFShift(currentDate);
    }
    data[placeInArray].shiftCount+=1;
    saveShifts();
}
void beginWeek()
{
    rememberShifts();
    ifstream LastDateIn ("LastDate.txt");
    if (LastDateIn.is_open())
    {
        LastDateIn >>ExcelFileName;
        LastDateIn.close();
    }
    else
        cout << "Unable to open file";


    string x = "Excel Files\\"+ExcelFileName+".csv";
    writeToCsv(x);

    time_t now = time(0); // get current time
    struct tm* tm = localtime(&now);

    Date currentDate(tm->tm_mon+1,tm->tm_mday,tm->tm_year+1900,tm->tm_hour,tm->tm_min);

   // ofstream myfile;

    string a = static_cast<ostringstream*>( &(ostringstream() << currentDate.getMonth()) )->str();
    string b = static_cast<ostringstream*>( &(ostringstream() << currentDate.getDay()) )->str();
    string c = static_cast<ostringstream*>( &(ostringstream() << currentDate.getYear()) )->str();
     x = a+"-"+b+"-"+c;

    //string woot = "Excel Files\\";
    //woot += x;
    //woot += ".csv";
    //const char *result = woot.c_str();

    //myfile.open(result);
    //myfile.close();
    //myfile.clear();
    //writeToCsv(woot);*/

    for(int i=0;i<100;i++)
    {
        data[i].r.Records::setBlank();
        data[i].shiftCount=1;
    }
    degenerateEmployees();
    //saveShifts();
    ofstream LastDateOut("LastDate.txt",ios::trunc);
    LastDateOut<< x;
    LastDateOut.close();
    beginDay();
}
void beginWeekAuto()
{

    beginDay();
}
void beginDay()
{
    rememberShifts();
    // Getting ExcelFileName
    ifstream LastDate ("LastDate.txt");
    if (LastDate.is_open())
    {
        LastDate >>ExcelFileName;
        LastDate.close();
        string x = "Excel Files\\"+ExcelFileName+".csv";
        //const char *result = x.c_str();
        writeToCsv(x);
    }
    else
        cout << "Unable to open file";
    // Getting Started

}
