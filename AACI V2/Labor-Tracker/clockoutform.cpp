#include "clockoutform.h"
#include "mainform.h"
#include "ui_clockoutform.h"

ClockoutForm::ClockoutForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ClockoutForm)
{
    ui->setupUi(this);
    employeeDataBase = ((MainForm*)parentWidget())->getEmployeeDataBase();

    projectDataBase = ((MainForm*)parentWidget())->getProjectDataBase();

    data = ((MainForm*)parentWidget())->getData();
    this->setGeometry(
        QStyle::alignedRect(
            Qt::LeftToRight,
            Qt::AlignCenter,
            this->size(),
            qApp->desktop()->availableGeometry()
        )
    );
}


ClockoutForm::~ClockoutForm()
{
    delete ui;
}

QDateTime ClockoutForm::format_datetimes(QDateTime z)
{
    int minTime = z.time().minute();
    int hourTime =z.time().hour();
    int dayOfMonth = z.date().daysInMonth();
    int dayOfYear = z.date().dayOfYear();
    if(minTime<7&&minTime>=0)
    {
        QTime x(z.time().hour(),0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=7&&minTime<23)
    {
        QTime x(z.time().hour(),15,0);
        QDate y(z.date());
        QDateTime n(y,x);
        z=n;
    }
    else if(minTime>=23&&minTime<37)
    {
        QTime x(z.time().hour(),30,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=37&&minTime<53)
    {
        QTime x(z.time().hour(),45,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth&& z.date().daysInYear()==dayOfYear)
    {
        z.date().addYears(1);
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth)
    {
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23)
    {
        z.date().addDays(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53)
    {
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    return z;

}

void ClockoutForm::ClockoutInitialize(QString i){
    this->showNormal();


    id=i;
    ProjectInitialize();
    ItemInitialize();
    LunchInitialize();
    TimeLeft();
    TimesInitialize();




    ui->FinishedButton->setEnabled(false);
    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(3);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->clearContents();

}
void ClockoutForm::ProjectInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    qry->prepare("select DISTINCT name from projectlist where id>0");
    qry->exec();
    modal->setQuery(*qry);
    ui->Projects->setModel(modal);

}
void ClockoutForm::on_Projects_currentIndexChanged()
{
    ItemInitialize();
}
void ClockoutForm::ItemInitialize(){
    QString id;
    QString x = ui->Projects->currentText();
    QSqlQueryModel * modal2=new QSqlQueryModel();
    QSqlQuery* qry = new QSqlQuery(data);
    qry->prepare("select id from projectlist where name='"+x+"'");
    if(qry->exec())
    {
           while(qry->next())
           {
               id = qry->value(0).toString();
           }
    }
    QSqlQuery* qry2=new QSqlQuery(data);
    id = "Project"+id;
    qry2->prepare("select DISTINCT name from '"+id+"'");
    qry2->exec();
    modal2->setQuery(*qry2);
    ui->Items->setModel(modal2);
}
void ClockoutForm::TimesInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry1 = new QSqlQuery(data);
    QString a = "0:00";
    QString b = ui->timeLeft->text();
    qDebug()<<ui->timeLeft->text();
    qry1->prepare("select time from timelist where time>'"+a+"'and time <='"+b+"'");
    if(qry1->exec())
    {
           while(qry1->next())
           {
               qDebug()<< qry1->value(0).toString();
           }
    }

    modal->setQuery(*qry1);
    ui->Times->setModel(modal);
}
void ClockoutForm::LunchInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry1 = new QSqlQuery(data);
    QString a = "0:00";

    QString b = "1:00";

   qry1->prepare("select time from timelist where time>='"+a+"'and time <='"+b+"'");


   if(qry1->exec())
    {
           while(qry1->next())
           {
              // qDebug()<< qry1->value(0).toString();
           }
    }

    modal->setQuery(*qry1);
    ui->Lunch->setModel(modal);
}

void ClockoutForm::TimeLeft(){
    QDateTime indt,outdt;
    QSqlQuery qry(data);

    outdt = format_datetimes(QDateTime::currentDateTime());
    QString timein,timeout,datein,dateout;

    timeout = outdt.toString("HH:mm:ss");
    dateout = outdt.toString("yyyy-MM-dd");

    qry.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
    QString shiftcount;
    if(qry.exec())
    {
        while(qry.next())
        {
            shiftcount = qry.value(0).toString();
        }
    }

    qry.clear();
    qry.prepare("select timein,datein from shiftlist where id='"+shiftcount+"'");
    \
    if(qry.exec())
    {
        while(qry.next())
        {
            timein = qry.value(0).toString();
            datein = qry.value(1).toString();
        }
    }


    indt = QDateTime(QDate::fromString(datein,"yyyy-MM-dd"),QTime::fromString(timein,"HH:mm:ss"));

    int secs = indt.secsTo(outdt);
    //qDebug()<<"Id"<<id<<"shiftcount"<<shiftcount<<"timein"<<timein<<"datein"<<datein;
    //qDebug()<<"Seconds:"<<QString::number(secs)<<"indt"<<indt.toString()<<"outdt"<<outdt.toString();
    int minutes = secs/60;



    for(int i =0;i < ui->Sections->rowCount(); i++){

        QString item = ui->Sections->item(i,2)->text();
        //qDebug()<<item;

        minutes-=(item.split(":")[0].toInt()*60);
        minutes-=item.split(":")[1].toInt();
    }
    QString lunch = ui->Lunch->currentText();
    minutes-=(lunch.split(":")[0].toInt()*60);
    minutes-=lunch.split(":")[1].toInt();
    int hours = minutes/60;
    minutes=minutes%60;
    if(minutes==0){
        ui->timeLeft->setText(QString::number(hours)+":"+QString::number(minutes)+"0");

    }
    else
        ui->timeLeft->setText(QString::number(hours)+":"+QString::number(minutes));


    //qDebug()<<hours<<minutes;
    if(ui->timeLeft->text()=="0:00")
        ui->FinishedButton->setEnabled(true);
    else
        ui->FinishedButton->setEnabled(false);
}



void ClockoutForm::on_FinishedButton_clicked()
{
    QSqlQuery* qry=new QSqlQuery(data);
    QSqlQuery* qry2=new QSqlQuery(data);
    QString shiftcount,employeeid,employeename,timein,datein;
    qry->prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
    if(qry->exec()){
        while(qry->next()){
            shiftcount = qry->value(0).toString();}}

    qry->clear();
    qry->prepare("select employeeid,employeename,timein,datein from shiftlist where id = '"+shiftcount+"'");

    if(qry->exec()){
        while(qry->next()){
            employeeid=qry->value(0).toString();
            employeename=qry->value(1).toString();
            timein=qry->value(2).toString();
            datein=qry->value(3).toString();
        }
    }

    QDateTime clockout = format_datetimes(QDateTime::currentDateTime());
    QString timeout = clockout.toString("HH:mm:ss");
    QString dateout = clockout.toString("yyyy-MM-dd");


    QString projectname,itemname, projectid,itemid,hours,lunch;
    projectname = ui->Sections->item(0,0)->text();
    qry->prepare("select id from projectlist where name='"+projectname+"'");
    if(qry->exec()){
        while(qry->next()){
            projectid=qry->value(0).toString();}}
    qry->clear();
    itemname=ui->Sections->item(0,1)->text();
    qry->prepare("select id from itemlist where name='"+itemname+"'");
    if(qry->exec()){
        while(qry->next()){
            itemid=qry->value(0).toString();}}
    qry->clear();

    hours=ui->Sections->item(0,2)->text();
    lunch=ui->Lunch->currentText();


    qry->clear();
    qry->prepare("update shiftlist set employeeid = '"+employeeid+"',projectid='"+projectid+"',itemid='"+itemid+"', employeename= '"+employeename+"',projectname = '"+projectname+"',itemname = '"+itemname+"',timein = '"+timein+"',timeout = '"+timeout+"'"
       ",datein = '"+datein+"',dateout = '"+dateout+"',timelunch = '"+lunch+"',time = '"+hours+"'  where id = '"+shiftcount+"'");
    qry->exec();
    if(ui->Sections->rowCount()>1)
    {
        for(int i =1; i<ui->Sections->rowCount();i++){


            projectname = ui->Sections->item(i,0)->text();
            qry->prepare("select id from projectlist where name='"+projectname+"'");
            if(qry->exec()){
                while(qry->next()){
                    projectid=qry->value(0).toString();}}
            qry->clear();
            itemname=ui->Sections->item(i,1)->text();
            qry->prepare("select id from itemlist where name='"+itemname+"'");
            if(qry->exec()){
                while(qry->next()){
                    itemid=qry->value(0).toString();}}
            qry->clear();

            hours=ui->Sections->item(i,2)->text();
            lunch=ui->Lunch->currentText();
            qry->clear();
            qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time) values('"+employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"')");


            qry->exec();

        }
    }





    qry->clear();
    qry->prepare("update employeelist set active='0' where id='"+employeeid+"'");
    qry->exec();


    this->hide();

    emit finished();
}
void ClockoutForm::on_CancelButton_clicked()
{

    this->hide();
    emit finished();
}

void ClockoutForm::on_Add_clicked()
{
    ui->Sections->setRowCount(ui->Sections->rowCount()+1);
    ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(ui->Times->currentText()));
    ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(ui->Projects->currentText()));
    ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(ui->Items->currentText()));

    ui->Sections->resizeRowsToContents();
}

void ClockoutForm::on_Edit_clicked()
{
    ui->Sections->setItem(selectedRow,0,new QTableWidgetItem(ui->Projects->currentText()));
    ui->Sections->setItem(selectedRow,1,new QTableWidgetItem(ui->Items->currentText()));
    ui->Sections->setItem(selectedRow,2,new QTableWidgetItem(ui->Times->currentText()));
    ui->Sections->resizeRowsToContents();

}

void ClockoutForm::on_Delete_clicked()
{
    /*QString time = ui->timeLeft->text();
    //qDebug()<<item;

    int hours=time.split(":")[0].toInt();
    int minutes=time.split(":")[1].toInt();

    minutes=minutes+hours*60;

    QString time2 = ui->Sections->item(selectedRow,2)->text();
    minutes-= time2.split(":")[0].toInt()*60;
    minutes-= time2.split(":")[1].toInt();

    hours=minutes/60;
    minutes=minutes%60;
    ui->timeLeft->setText(QString::number(hours)+":"+QString::number(minutes));

*/
    ui->Sections->removeRow(selectedRow);
    TimeLeft();

}

void ClockoutForm::on_Sections_cellClicked(int row, int column)
{
    selectedRow=row;
    column++;
    QString project = ui->Sections->item(row,0)->text();
    QString item = ui->Sections->item(row,1)->text();
    QString time = ui->Sections->item(row,2)->text();


    int index = ui->Projects->findText(project);
    if ( index != -1 ) { // -1 for not found
       ui->Projects->setCurrentIndex(index);
    }

    index = ui->Items->findText(item);
    if ( index != -1 ) { // -1 for not found
       ui->Items->setCurrentIndex(index);
    }

    index = ui->Times->findText(time);
    if ( index != -1 ) { // -1 for not found
       ui->Times->setCurrentIndex(index);
    }


}

void ClockoutForm::on_Sections_cellChanged()
{
    TimeLeft();
}


void ClockoutForm::on_Lunch_currentTextChanged(const QString &arg1)
{
    TimeLeft();
}
