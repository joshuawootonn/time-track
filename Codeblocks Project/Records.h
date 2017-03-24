
#ifndef RECORDS_H
#define RECORDS_H

using namespace std;

#include "Shift.h"
#include "Date.h"
extern Date blankDate;
extern Shift blankShift;


class Records
{
public:

    Records(){beginningOfWeek=blankDate;one=blankShift;two=blankShift;three=blankShift;four=blankShift;five=blankShift;six=blankShift;seven=blankShift;eight=blankShift;nine=blankShift;ten=blankShift;eleven=blankShift;twelve=blankShift;thirteen=blankShift;fourteen=blankShift;fifteen=blankShift;};
    Records(Date a, Shift b,Shift c, Shift d, Shift e, Shift f, Shift g,Shift h, Shift i, Shift j, Shift k,Shift l,Shift m,Shift n,Shift o,Shift p);
    void setBeginningOfWeek(Date x);
    void setOne(Shift x);
    void setTwo(Shift x);
    void setThree(Shift x);
    void setFour(Shift x);
    void setFive(Shift x);
    void setSix(Shift x);
    void setSeven(Shift x);
    void setEight(Shift x);
    void setNine(Shift x);
    void setTen(Shift x);
    void setEleven(Shift x);
    void setTwelve(Shift x);
    void setThirteen(Shift x);
    void setFourteen(Shift x);
    void setFifteen(Shift x);
    void setBlank();
    void setAll();
    void print() const;

    Date getBeginningOfWeek() const{return(beginningOfWeek);};
    Shift getOne() const{return(one);};
    Shift getTwo() const{return(two);};
    Shift getThree() const{return(three);};
    Shift getFour() const{return(four);};
    Shift getFive() const{return(five);};
    Shift getSix() const{return(six);};
    Shift getSeven() const{return(seven);};
    Shift getEight() const{return(eight);};
    Shift getNine() const{return(nine);};
    Shift getTen() const{return(ten);};
    Shift getEleven() const{return(eleven);};
    Shift getTwelve() const{return(twelve);};
    Shift getThirteen() const{return(thirteen);};
    Shift getFourteen() const{return(fourteen);};
    Shift getFifteen() const{return(fifteen);};
    ~Records();



    Date beginningOfWeek;
    Shift one;
    Shift two;
    Shift three;
    Shift four;
    Shift five;
    Shift six;
    Shift seven;
    Shift eight;
    Shift nine;
    Shift ten;
    Shift eleven;
    Shift twelve;
    Shift thirteen;
    Shift fourteen;
    Shift fifteen;
};

#endif // RECORDS_H
