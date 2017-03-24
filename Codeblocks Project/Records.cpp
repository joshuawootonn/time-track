#include<iostream>

using namespace std;

#include "Records.h"
#include "Shift.h"
#include "Date.h"
extern Date blankDate;
extern Shift blankShift;


Records::Records(Date a, Shift b,Shift c, Shift d, Shift e, Shift f, Shift g,Shift h, Shift i, Shift j, Shift k,Shift l,Shift m,Shift n,Shift o,Shift p)
{
    getBeginningOfWeek()=a;
    getOne()=b;
    getTwo()=c;
    getThree()=d;
    getFour()=e;
    getFive()=f;
    getSix()=g;
    getSeven()=h;
    getEight()=i;
    getNine()=j;
    getTen()=k;
    getEleven()=l;
    getTwelve()=m;
    getThirteen()=n;
    getFourteen()=o;
    getFifteen()=p;
}
void Records::setBeginningOfWeek(Date x)
{
    getBeginningOfWeek()=x;
}
void Records::setOne(Shift x)
{
    getOne()=x;
}
void Records::setTwo(Shift x)
{
    getTwo()=x;
}
void Records::setThree(Shift x)
{
    getThree()=x;
}
void Records::setFour(Shift x)
{
    getFour()=x;
}
void Records::setFive(Shift x)
{
    getFive()=x;
}
void Records::setSix(Shift x)
{
    getSix()=x;
}
void Records::setSeven(Shift x)
{
    getSeven()=x;
}
void Records::setEight(Shift x)
{
    getEight()=x;
}
void Records::setNine(Shift x)
{
    getNine()=x;
}
void Records::setTen(Shift x)
{
    getTen()=x;
}
void Records::setEleven(Shift x)
{
    getEleven()=x;
}
void Records::setTwelve(Shift x)
{
    getTwelve()=x;
}
void Records::setThirteen(Shift x)
{
    getThirteen()=x;
}
void Records::setFourteen(Shift x)
{
    getFourteen()=x;
}
void Records::setFifteen(Shift x)
{
    getFifteen()=x;
}
void Records::setBlank()
{
    one.Shift::setBlank();
    two.Shift::setBlank();
    three.Shift::setBlank();
    four.Shift::setBlank();
    five.Shift::setBlank();
    six.Shift::setBlank();
    seven.Shift::setBlank();
    eight.Shift::setBlank();
    nine.Shift::setBlank();
    ten.Shift::setBlank();
    eleven.Shift::setBlank();
    twelve.Shift::setBlank();
    thirteen.Shift::setBlank();
    fourteen.Shift::setBlank();
    fifteen.Shift::setBlank();
}
void Records::print() const
{

    if(getOne().getBeginOfShift()> blankDate)
        getOne().Shift::print();
    if(getTwo().getBeginOfShift()> blankDate)
        getTwo().Shift::print();
    if(getThree().getBeginOfShift()> blankDate)
        getThree().Shift::print();
    if(getFour().getBeginOfShift()> blankDate)
        getFour().Shift::print();
    if(getFive().getBeginOfShift()> blankDate)
        getFive().Shift::print();
    if(getSix().getBeginOfShift()> blankDate)
        getSix().Shift::print();
    if(getSeven().getBeginOfShift()> blankDate)
        getSeven().Shift::print();
    if(getEight().getBeginOfShift()> blankDate)
        getEight().Shift::print();
    if(getNine().getBeginOfShift()> blankDate)
        getNine().Shift::print();
    if(getTen().getBeginOfShift()> blankDate)
        getTen().Shift::print();
    if(getEleven().getBeginOfShift()> blankDate)
        getEleven().Shift::print();
    if(getTwelve().getBeginOfShift()> blankDate)
        getTwelve().Shift::print();
    if(getThirteen().getBeginOfShift()> blankDate)
        getThirteen().Shift::print();
    if(getFourteen().getBeginOfShift()> blankDate)
        getFourteen().Shift::print();
    if(getFifteen().getBeginOfShift()> blankDate)
        getFifteen().Shift::print();
    /* std::cout << "--Monday--";
    getMonday().Shift::print();
    std::cout << "\n\n--Tuesday--";
    getTuesday().Shift::print();
    std::cout << "\n\n--Wednesday--";
    getWednesday().Shift::print();
    std::cout << "\n\n--Thursday--";
    getThursday().Shift::print();
    std::cout << "\n\n--Friday--";
    getFriday().Shift::print();*/


}
Records::~Records()
{

}
