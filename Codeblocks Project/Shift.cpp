
#include<iostream>

using namespace std;
#include "Shift.h"
#include "Date.h"
extern Date blankDate;
extern Shift blankShift;
/*Shift::Shift(Date in, Date out, int identity)
{
    beginOfShift=in;
    endOfShift=out;
    id=identity;
    Length = (0,0,0,0,0);
}*/
void Shift::setBeginOFShift(Date x)
{
    beginOfShift = x;
}
void Shift::setEndOFShift(Date x)
{
    endOfShift = x;
}
void Shift::setBlank()
{
    beginOfShift= blankDate;
    endOfShift=blankDate;
    Length=blankDate;
}
void Shift::setAll(Date x,Date y,Date z)
{
    beginOfShift= x;
    endOfShift=y;
    Length=z;
}


Date Shift::getLength()
{
    int year =getEndOfShift().getYear()-getBeginOfShift().getYear();
    int month =getEndOfShift().getMonth()-getBeginOfShift().getMonth();
    int day =getEndOfShift().getDay()-getBeginOfShift().getDay();
    int hour =getEndOfShift().getHour()-getBeginOfShift().getHour();
    int minute =getEndOfShift().getMinute()-getBeginOfShift().getMinute();
    if(hour<0)
    {
        hour =hour +12;
    }
    if(minute<0)
    {
        hour--;
        minute=minute+60;
    }
    Date x (month,day,year,hour,minute);
    return x;
}
int Shift::getLengthMinutes()
{
    Date x = Shift::getLength();
    int sum=0;
    int dy = x.getDay();
    sum+=(dy*60*24);
    int hr =x.getHour();
    sum+=(hr*60);
    int mi = x.getMinute();
    sum+=mi;
    return sum;

}

void Shift::print()
{
    std::cout << "\nClock in: ";
    getBeginOfShift().Date::print();
    std::cout << "\nClock out: ";
    getEndOfShift().Date::print();
    std::cout << "\nLength: ";
    getLength().Date::printShort();


} // end function print

Shift::~Shift()
{
}




