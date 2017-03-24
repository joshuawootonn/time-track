//-----------------------------------------------------------------------------
// Programmer: Joshua Wootonn
// Name: Date.cpp
// Description: Implementation of member functions for Date class (based on
//              Fig. 18.11 on pages 646-647)
//-----------------------------------------------------------------------------

#include <iostream>
#include <sstream>

#include "Date.h" // include Date class definition
using namespace std;

// constructor confirms proper value for month; calls
// utility function checkDay to confirm proper value for day
//-------------------------------------------------------------
Date::Date( int mn, int dy, int yr, int hr, int minu)
{
    month = mn;
    year = yr;
    day = dy ;
    hour = hr;
    minute=minu;
} // end Date constructor


Date::Date (const Date & dateToCopyFrom) // copy constructor
{
    month = dateToCopyFrom.month;
    day = dateToCopyFrom.day;
    year = dateToCopyFrom.year;
    hour = dateToCopyFrom.hour;
    minute = dateToCopyFrom.minute;
}

Date & Date::operator = (const Date & other) // assignmenrt operator
{
    this->month = other.month;
    this->day = other.day;
    this->year = other.year;
    this->hour = other.hour;
    this->minute= other.minute;
    return *this;
}

/* setDate date from the user */
void Date::setDate()
{
    bool flag = false;
    int mn,dy,yr,hr,minu;
    cin.clear();
    do
    {
        cout << "(month day year hour minute):\n";
        cin >> mn >> dy >> yr >> hr >> minu;
        year = yr;
        month = mn;
        day = dy;
        hour = hr;
        minute=minu;

        if(yr < 1900)
        {
            cout << "Cannot handle dates prior to 1900 AD" << endl;
            cout << "Try again!" << endl;
            flag = false;
        }
        else if(!isValidDate())
        {
            cout << "Invalid date" << endl;
            cout << "Try again!" << endl;
            flag = false;
        }
        else
            flag = true;
    }

    while (!flag);

}//end date constructor


// print Date object in form month/day/year
//-------------------------------------------------------------
void Date::print() const
{
    std::cout << hour<<":"<<minute<< " on "<< month+1<< '/' << day << '/' << year;
} // end function print
void Date::printShort() const
{
    std::cout << hour<<":"<<minute;
} // end function print
string Date::asAString()
{

    string sMonth,sDay,sYear,sHour,sMinute;//string which will contain the result

    stringstream convertm,convertd,converty,converth,convertM; // stringstream used for the conversion

    convertm << (month);//add the value of Number to the characters in the stream
    sMonth = convertm.str();
    convertd << day;//add the value of Number to the characters in the stream
    sDay = convertd.str();
    converty << year;//add the value of Number to the characters in the stream
    sYear = converty.str();
    converth << hour;//add the value of Number to the characters in the stream
    sHour = converth.str();
    convertM << minute;//add the value of Number to the characters in the stream
    sMinute = convertM.str();
    std::string x = sMonth+" "+sDay+" "+sYear+" "+sHour+" "+sMinute;
    return x;
}

// output Date object to show when its destructor is called
//-------------------------------------------------------------
Date::~Date()
{
} // end ~Date destructor

// utility function to confirm proper day value based on
// month and year; handles leap years, too
//-------------------------------------------------------------
int Date::checkDay( int testDay ) const
{
    static const int daysPerMonth[ monthsPerYear + 1 ] =
    { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

    // determine whether testDay is valid for specified month
    if ( testDay > 0 && testDay <= daysPerMonth[ month ] )
        return testDay;

    // February 29 check for leap year
    if ( month == 2 && testDay == 29 && ( year % 400 == 0 ||
                                          ( year % 4 == 0 && year % 100 != 0 ) ) )
        return testDay;

    std::cout << "Invalid day (" << testDay << ") set to 1.\n";

    return 1; // leave object in consistent state if bad value
} // end function checkDay


bool Date::operator>(const Date &dateOnRight) // greater than operator
{
    bool greater;

    int year = dateOnRight.getYear();
    if(dateOnRight.getYear() > year)
        greater = false;

    else if(dateOnRight.getYear() == year && dateOnRight.getMonth() > month)
        greater = false;

    else if(dateOnRight.getYear() == year && dateOnRight.getMonth() == month && dateOnRight.getDay() >= day)
        greater = false;

    else if(dateOnRight.getYear() == year && dateOnRight.getMonth() == month && dateOnRight.getDay() == day&& dateOnRight.getHour()>= hour)
        greater = false;

    else if(dateOnRight.getYear() == year && dateOnRight.getMonth() == month && dateOnRight.getDay() == day&& dateOnRight.getHour()== hour&& dateOnRight.getMinute()<= minute)
        greater = false;
    else
        greater = true;

    return greater;

}
// add one year to date
void Date::addYears(int nyears)
{
    year = year + nyears;
    //month = month;
    if (day == 29 && !isLeapYear(year))
    {
        day = 28;
    }//end if

}

/***********************************************/
bool Date::isLeapYear(int year)
{
    bool leapYear = false;
    if (year % 400 == 0)
    {
        leapYear = true;
    }
    else
    {
        if (year % 100 == 0)
        {
            leapYear = false;
        }
        else
        {
            if (year % 4 == 0)
                leapYear = true;
            else
                leapYear = false;
        }
    }
    // cout << "leapYear  " << leapYear << endl;
    return leapYear;

}

/************************************************/
bool Date::isValidDate()
{
    bool validDate;
    int monthDays[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    if(month < 1 || month > 12
            || day < 0 || !((isLeapYear(year) && month == 2 && day <= 29)
                            || (day <= monthDays[month - 1])))
        validDate = false;
    else
        validDate = true;
    // cout << "validDate  " << validDate << endl;
    return validDate;
}

