//-----------------------------------------------------------------------------
// Programmer: Joshua Wootonn
// Name: Date.h
// Description: Header file for Date class. This class represents a date
//              (day, month, year). It is based on Fig. 18.10 on page 646.
//-----------------------------------------------------------------------------
#ifndef DATE_H
#define DATE_H

class Date
{
public:
    static const int monthsPerYear = 12; // number of months in a year
    Date (int mn=1, int dy=1, int yr=1900, int hr=0, int minu =0); // constructors
    Date (const Date& dateToCopyFrom); // copy constructor
    Date & operator = (const Date & other); // assignmenrt operator
    void setDate ();
    int getYear() const {return(year);};
    int getMonth() const {return (month);};
    int getDay() const {return (day);};
    int getHour() const {return (hour);};
    int getMinute() const {return (minute);};
    std::string getWeekDay() const{return(weekDay);};
    void print() const;
    void printShort() const;// print date in month/day/year format
    std::string asAString();

    bool operator>(const Date &dateOnRight);
    void addYears(int nyears);

    ~Date(); // destructor provided to confirm destruction order
private:
    int month; // 1-12 (January-December)
    int day; // 1-31 based on month
    int year; // any year
    int hour;
    int minute;
    std::string weekDay;
    // utility function to check if day is proper for month and year
    int checkDay( int testDay ) const;
    bool isLeapYear(int year);
    bool isValidDate();
};


#endif
