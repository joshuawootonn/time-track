

#ifndef SHIFT_H
#define SHIFT_H

using namespace std;

#include "Date.h"

extern Date blankDate;


class Shift: public Date
{
public:
    //Constructor
    Shift(){beginOfShift=blankDate; endOfShift=blankDate; ident = 1;};//blankDate,blankDate,(9999),blankDate);
    Shift(Date in, Date out, int identity){beginOfShift=in; endOfShift=out; ident = identity;};

    void setBeginOFShift(Date x);
    void setEndOFShift(Date x);
    void setBlank();
    void setAll(Date x,Date y,Date z);
    Date getBeginOfShift() {return (beginOfShift);};
    Date getEndOfShift() const{return (endOfShift);};

    void print() ;

    Date getLength();
    int getLengthMinutes();
    int getID() const{return (ident);};
    ~Shift();
private:
    Date beginOfShift;
    Date endOfShift;

    Date Length;
    int ident;

};

#endif // SHIFT_H
