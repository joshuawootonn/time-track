#include "clockoutform.h"
#include "mainform.h"
#include "ui_clockoutform.h"

ClockoutForm::ClockoutForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ClockoutForm)
{
    ui->setupUi(this);
    data = ((MainForm*)parentWidget())->getData();

    clicked = false;
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

/* This function is for ininializing this dialog  */
void ClockoutForm::ClockoutInitialize(QString i){
    this->showNormal();
    id=i;
    ProjectInitialize();
    ItemInitialize();
    TimesInitialize();
    TimeLeft();
    ui->DescriptionWidget->setVisible(false);



    ui->FinishedButton->setEnabled(false);
    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(3);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));


}


/* These next six functions are used to initialize the
 * comboboxes with there appropriate model's. */
void ClockoutForm::ProjectInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    qry->prepare("select DISTINCT name from projectlist where current = '1' ORDER BY name ASC");
    qry->exec();
    modal->setQuery(*qry);
    ui->Projects->setModel(modal);

}
void ClockoutForm::on_Projects_currentIndexChanged(const QString &arg1)
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
    qry2->prepare("select DISTINCT name from "+id+" ORDER BY name ASC");
    qry2->exec();

    modal2->setQuery(*qry2);
    ui->Items->setModel(modal2);


}
void ClockoutForm::TimesInitialize(){

    QSqlQuery* qry = new QSqlQuery(data);

    qry->prepare("Select time from timelist where idtimelist < 5 ORDER BY time");
    if(qry->exec())
    {
           while(qry->next())
           {
               ui->Minutes->addItem(qry->value(0).toString());
               ui->Lunch->addItem("00:"+qry->value(0).toString());

           }
    }
    ui->Lunch->addItem("01:00");
    qDebug()<<"1";
    qry->clear();
    qry->prepare("Select time from timelist where idtimelist >= 5 ORDER BY time");
    if(qry->exec())
    {
           while(qry->next())
           {
               ui->Hours->addItem(qry->value(0).toString());
           }
    }
    qDebug()<<"2";




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
    qry.prepare("select timein,datein from shiftlist where shiftid='"+shiftcount+"'");
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
    qDebug()<<minutes;


    for(int i =0;i < ui->Sections->rowCount(); i++){


        QString item = ui->Sections->item(i,2)->text();


        minutes-=(item.split(":")[0].toInt()*60);
        minutes-=item.split(":")[1].toInt();
    }
    QString lunch = ui->Lunch->currentText();
    minutes-=(lunch.split(":")[0].toInt()*60);
    minutes-=lunch.split(":")[1].toInt();
//    minutes-=ui->Lunch->time().hour()*60;
//    minutes-=ui->Lunch->time().minute();
    int hours = minutes/60;
    minutes=minutes%60;

    QString j;
    if(minutes==0){
        j = QString::number(hours)+":"+QString::number(minutes)+"0";

    }
    else
        j =QString::number(hours)+":"+QString::number(minutes);

    ui->timeLeft->setText(j);
    if(ui->timeLeft->text()=="0:00")
    {
        if(ui->DescriptionWidget->isVisible()&&ui->Description->toPlainText()!=""){

            ui->FinishedButton->setEnabled(true);
        }
        else if(!ui->DescriptionWidget->isVisible()&&ui->Sections->rowCount()>0){
            ui->FinishedButton->setEnabled(true);
        }
        else{
            ui->FinishedButton->setEnabled(false);
        }

    }
    else
        ui->FinishedButton->setEnabled(false);
}


/*These classes are used to update the table and
 * comboboxs when triggers are hit*/
void ClockoutForm::on_Add_clicked()
{
    ui->Sections->setRowCount(ui->Sections->rowCount()+1);
//    if (QString::number(ui->Times->time().minute()) == "0")
//        ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())+"0"));
//    else
//        ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())));
    ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(ui->Hours->currentText()+":"+ui->Minutes->currentText()));
    ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(ui->Projects->currentText()));
    ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(ui->Items->currentText()));
    if(ui->Items->currentText()=="Other")
    {
        ui->DescriptionWidget->setVisible(true);
    }
    ui->Sections->resizeRowsToContents();
    TimeLeft();
}
void ClockoutForm::on_Delete_clicked()
{
    if (clicked)
    {
        if(ui->Sections->item(selectedRow,1)->text()=="Other"){
            ui->Description->setText("");
            ui->DescriptionWidget->setVisible(false);
        }
        ui->Sections->removeRow(selectedRow);
        TimeLeft();
        clicked = false;
    }


}
void ClockoutForm::on_Sections_cellClicked(int row, int column)
{
    selectedRow=row;
    column++;
    clicked = true;
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

//    QTime t(time.split(":")[0].toInt(),time.split(":")[1].toInt());
//    if ( time != "" ) { // -1 for not found
//       ui->Times->setTime(t);

//    }
    index = ui->Hours->findText(time.split(":")[0]);
    if (time != "")
        ui->Hours->setCurrentIndex(index);

    index = ui->Minutes->findText(time.split(":")[1]);
    if (time != "")
        ui->Minutes->setCurrentIndex(index);


}
void ClockoutForm::on_Sections_cellChanged()
{
    TimeLeft();
}
void ClockoutForm::on_Lunch_currentTextChanged(const QString &arg1)
{
    TimeLeft();
}

void ClockoutForm::on_Description_textChanged()
{
    TimeLeft();
}


/*These two classes are used to finish or cancel the
 * changes that the user was trying to implement.*/
void ClockoutForm::on_FinishedButton_clicked()
{
    QSqlQuery* qry=new QSqlQuery(data);
    QString shiftId,employeeid,employeename,timein,datein;

    qry->prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
    if(qry->exec()){
        while(qry->next()){
            shiftId = qry->value(0).toString();}}

    qry->clear();
    qry->prepare("select employeeid,employeename,timein,datein from shiftlist where shiftid = '"+shiftId+"'");

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







    qry->clear();
    qry->prepare("delete from shiftlist where shiftid='"+shiftId+"'");
    qry->exec();



    QString projectname,itemname, projectid,itemid,hours,lunch,description;
    description=ui->Description->toPlainText().simplified();

    for(int i =0; i<ui->Sections->rowCount();i++){


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



        hours=ui->Sections->item(i,2)->text();
        lunch=ui->Lunch->currentText();//QString::number(ui->Lunch->time().hour())+":"+QString::number(ui->Lunch->time().minute());
        qry->clear();


        if(itemname=="Other")
            qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid,description) values('"
                     +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftId+"','"+description+"')");
        else
            qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid) values('"
                     +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftId+"')");

        qry->exec();

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



