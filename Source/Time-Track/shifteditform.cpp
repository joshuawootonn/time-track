#include "shifteditform.h"
#include "ui_shifteditform.h"
#include "mainform.h"

ShiftEditForm::ShiftEditForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ShiftEditForm)
{
    ui->setupUi(this);

    data = ((MainForm*)parentWidget())->getData();
//    this->setGeometry(
//        QStyle::alignedRect(
//            Qt::LeftToRight,
//            Qt::AlignCenter,
//            this->size(),
//            qApp->desktop()->availableGeometry()
//        )
//    );


    clicked = false;
    ui->RefreshButton->hide();
    ui->Add->setDefault(false);
    ui->Delete->setDefault(false);
    ui->FinishedButton->setDefault(false);
    ui->RefreshButton->setDefault(false);
    ui->CancelButton->setDefault(false);
    ui->Description_Check->setChecked(true);

    //ui->Times->setMaximumTime(QTime(48,0,0));
}

ShiftEditForm::~ShiftEditForm()
{
    delete ui;
}

QDateTime ShiftEditForm::format_datetimes(QDateTime z)
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


/* These next three functions are for ininializing this
 * dialog according to its purpose. The first for adding
 * a new shift the second for editing a existing shift.
 * The third for editing a working shift. */
void ShiftEditForm::AddShift(){
    this->showNormal();
    deactivate = false;


    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    //TimesInitialize();

    ui->DescriptionWidget->setVisible(false);


    ui->DateTime1->setDateTime(QDateTime(QDate::currentDate(),QTime(6,30,0)));
    ui->DateTime2->setDateTime(QDateTime(QDate::currentDate(),QTime(18,30,0)));


    ui->FinishedButton->setEnabled(false);
    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(3);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->clearContents();

}
void ShiftEditForm::EditFinishedShift(QString shiftid){
    deactivate = false;
    this->showNormal();
    shiftId = shiftid;
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    //TimesInitialize();

    ui->DateTime1->setDateTime(format_datetimes(QDateTime::currentDateTime()));
    ui->DateTime2->setDateTime(format_datetimes(QDateTime::currentDateTime()));

    QSqlQuery* qry=new QSqlQuery(data);
    QString employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,description;
    qry->prepare("select employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,description from shiftlist where shiftid='"+shiftid+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            employeename = qry->value(0).toString();
            projectname = qry->value(1).toString();
            itemname = qry->value(2).toString();
            timein = qry->value(3).toString();
            timeout = qry->value(4).toString();
            datein = qry->value(5).toString();
            dateout = qry->value(6).toString();
            timelunch = qry->value(7).toString();
            description = qry->value(8).toString();
        }
    }

    ui->Name->setCurrentIndex(ui->Name->findText(employeename));
    ui->Projects->setCurrentIndex(ui->Projects->findText(projectname));
    ui->Items->setCurrentIndex(ui->Items->findText(itemname));
    ui->DateTime1->setTime(QTime::fromString(timein,"HH:mm:ss"));
    ui->DateTime2->setTime(QTime::fromString(timeout,"HH:mm:ss"));
    ui->DateTime1->setDate(QDate::fromString(datein,"yyyy-MM-dd"));
    ui->DateTime2->setDate(QDate::fromString(dateout,"yyyy-MM-dd"));
    //ui->Lunch->setCurrentIndex(ui->Lunch->findText(timelunch));
    ui->Lunch->setTime(QTime(timelunch.split(":")[0].toInt(),timelunch.split(":")[1].toInt()));
    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(3);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    if(description=="")
        ui->DescriptionWidget->setVisible(false);
    else{
        ui->DescriptionWidget->setVisible(true);
        ui->Description->setText(description);
    }

    qry->clear();
    qry->prepare("select time,projectname,itemname from shiftlist where shiftid='"+shiftid+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            ui->Sections->setRowCount(ui->Sections->rowCount()+1);
            ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(qry->value(0).toString()));
            ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(qry->value(1).toString()));
            ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(qry->value(2).toString()));

        }
    }
    ui->Sections->resizeRowsToContents();

    ui->FinishedButton->setEnabled(true);





}
void ShiftEditForm::EditWorkingShift(QString shiftid,QString id){
    this->showNormal();
    deactivate = true;
    shiftId= shiftid;
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    // TimesInitialize();
    ui->DateTime1->setDateTime(format_datetimes(QDateTime::currentDateTime()));
    ui->DateTime2->setDateTime(format_datetimes(QDateTime::currentDateTime()));

    QSqlQuery* qry=new QSqlQuery(data);
    QString employeename,timein,datein;
    qry->prepare("select employeename,timein,datein from shiftlist where id='"+id+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            employeename = qry->value(0).toString();
            timein = qry->value(1).toString();
            datein = qry->value(2).toString();
        }
    }


    ui->DescriptionWidget->setVisible(false);


    ui->Name->setCurrentIndex(ui->Name->findText(employeename));

    ui->DateTime1->setTime(QTime::fromString(timein,"HH:mm:ss"));

    ui->DateTime1->setDate(QDate::fromString(datein,"yyyy-MM-dd"));


    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(3);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));



    ui->FinishedButton->setEnabled(false);



}
void ShiftEditForm::updateShiftEdit(){
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
}

/* These next six functions are used to initialize the
 * comboboxes with there appropriate model's. */
void ShiftEditForm::EmployeeInitialize(){

    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    qry->prepare("select DISTINCT name from employeelist where current='1'  ORDER BY name ASC");
    qry->exec();
    modal->setQuery(*qry);
    ui->Name->setModel(modal);
    /*
    QCompleter * comp = new QCompleter(this);
    comp->setModel(modal);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    ui->Name->setCompleter(comp);
    ui->Name->setCurrentText("");*/
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Name);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Name->setCurrentText("");


}
void ShiftEditForm::ProjectInitialize(){

    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    qry->prepare("select DISTINCT name from projectlist where current = '1' ORDER BY name ASC");
    qry->exec();
    modal->setQuery(*qry);
    ui->Projects->setModel(modal);
//    QCompleter * comp = new QCompleter(this);
//    comp->setModel(modal);
//    comp->setCaseSensitivity(Qt::CaseInsensitive);
//    comp->setCompletionMode(QCompleter::PopupCompletion);
//    //comp->popup()->setCurrentIndex(comp->completionModel()->index(0,0));
//    ui->Projects->setCompleter(comp);

    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Projects);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Projects->setCurrentText("");


}
void ShiftEditForm::ItemInitialize(){

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
//    QCompleter * comp = new QCompleter(this);
//    comp->setModel(modal2);
//    comp->setCaseSensitivity(Qt::CaseInsensitive);
//    comp->setCompletionMode(QCompleter::PopupCompletion);
//    ui->Items->setCompleter(comp);
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Items);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Items->setCurrentText("");
}
/*
void ShiftEditForm::TimesInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry1 = new QSqlQuery(data);
    QString a = "0:00";
    QString b = ui->timeLeft->text();
    //qDebug()<<ui->timeLeft->text();
    qry1->prepare("SELECT TIME_FORMAT(time,'%H:%i') from timelist");
    if(qry1->exec())
    {
           while(qry1->next())
           {
               //qDebug()<< qry1->value(0).toString();
           }
    }
    //qDebug()<<"time: "<<qry1->lastError();

    modal->setQuery(*qry1);
    ui->Times->setModel(modal);
}
void ShiftEditForm::LunchInitialize(){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry1 = new QSqlQuery(data);

   qry1->prepare("select TIME_FORMAT(time,'%H:%i') from timelist where id<6");

   if(qry1->exec())
    {
           while(qry1->next())
           {
              // qDebug()<< qry1->value(0).toString();
           }
    }
    modal->setQuery(*qry1);
    ui->Lunch->setModel(modal);
}*/
void ShiftEditForm::TimeLeft(){
    QDateTime indt,outdt;
    QString timein,timeout,datein,dateout;
    timein = ui->DateTime1->time().toString("HH:mm:ss");
    datein = ui->DateTime1->date().toString("yyyy-MM-dd");
    timeout = ui->DateTime2->time().toString("HH:mm:ss");
    dateout = ui->DateTime2->date().toString("yyyy-MM-dd");

    indt = QDateTime(QDate::fromString(datein,"yyyy-MM-dd"),QTime::fromString(timein,"HH:mm:ss"));
    outdt = QDateTime(QDate::fromString(dateout,"yyyy-MM-dd"),QTime::fromString(timeout,"HH:mm:ss"));

    indt = format_datetimes(indt);
    outdt = format_datetimes(outdt);



    int secs = indt.secsTo(outdt);
    int minutes = secs/60;



    for(int i =0;i < ui->Sections->rowCount(); i++){

        QString item = ui->Sections->item(i,2)->text();
        minutes-=(item.split(":")[0].toInt()*60);
        minutes-=item.split(":")[1].toInt();
    }
//    QString lunch = ui->Lunch->currentText();
//    minutes-=(lunch.split(":")[0].toInt()*60);
//    minutes-=lunch.split(":")[1].toInt();
    minutes-=ui->Lunch->time().hour()*60;
    minutes-=ui->Lunch->time().minute();
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
        if(ui->Description->isVisible()&&ui->Description->toPlainText()!=""){
            ui->FinishedButton->setEnabled(true);
        }else if (ui->Description_Check->isChecked()){
            ui->FinishedButton->setEnabled(true);
        }
        else if(!ui->Description->isVisible()&&ui->Sections->rowCount()>0){
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

void ShiftEditForm::on_Projects_currentIndexChanged(const QString &arg1)
{
     ItemInitialize();
}
void ShiftEditForm::on_Add_clicked()
{
    if(ui->Projects->currentText() != "" && ui->Items->currentText() != "")
    {
        ui->Sections->setRowCount(ui->Sections->rowCount()+1);
        if (QString::number(ui->Times->time().minute()) == "0")
            ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())+"0"));
        else
            ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())));
        ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(ui->Projects->currentText()));
        ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(ui->Items->currentText()));
        if(ui->Items->currentText()=="Other")
        {
            ui->DescriptionWidget->setVisible(true);
        }

        ui->Sections->resizeRowsToContents();
        TimeLeft();
        ui->Items->clearEditText();
        ui->Projects->clearEditText();
        if(ui->timeLeft->text() == "0:00")
            ui->FinishedButton->setFocus();
        else
            ui->Projects->setFocus();
    }

}
void ShiftEditForm::on_Delete_clicked()
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
void ShiftEditForm::on_Sections_cellClicked(int row, int column)
{
    selectedRow=row;
    clicked = true;
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

    QTime t(time.split(":")[0].toInt(),time.split(":")[1].toInt());
    if ( time != "" ) { // -1 for not found
       ui->Times->setTime(t);

    }


}
void ShiftEditForm::on_Sections_cellChanged()
{
    TimeLeft();
}
void ShiftEditForm::on_Lunch_currentTextChanged(const QString &arg1)
{
    TimeLeft();
}
void ShiftEditForm::on_Lunch_timeChanged(const QTime &time)
{
    TimeLeft();

}
void ShiftEditForm::on_DateTime1_dateTimeChanged(const QDateTime &dateTime)
{
    TimeLeft();
}
void ShiftEditForm::on_DateTime2_dateTimeChanged(const QDateTime &dateTime)
{
    TimeLeft();
}
void ShiftEditForm::on_Description_textChanged()
{
    TimeLeft();
}
void ShiftEditForm::on_Description_Check_clicked()
{
    TimeLeft();
}

/*These two classes are used to finish or cancel the
 * changes that the user was trying to implement.*/
void ShiftEditForm::on_RefreshButton_clicked()
{
//    data = ((MainForm*)parentWidget())->getData();
//    EmployeeInitialize();
//    ProjectInitialize();
//    ItemInitialize();
}

bool ShiftEditForm::getSuccess() const
{
    return success;
}


void ShiftEditForm::on_FinishedButton_clicked()
{
    QSqlQuery* qry=new QSqlQuery(data);
    QString employeeid,employeename;


    qry->clear();
    qry->prepare("delete from shiftlist where shiftid='"+shiftId+"'");
    qry->exec();

    employeename = ui->Name->currentText();
    qry->prepare("select id from employeelist where name='"+employeename+"'");
    if(qry->exec()){
        while(qry->next())
            employeeid = qry->value(0).toString();
    }


    QDateTime clockin = ui->DateTime1->dateTime();
    QString timein = clockin.toString("HH:mm:ss");
    QString datein = clockin.toString("yyyy-MM-dd");


    QDateTime clockout = ui->DateTime2->dateTime();
    QString timeout = clockout.toString("HH:mm:ss");
    QString dateout = clockout.toString("yyyy-MM-dd");


    QString projectname,itemname, projectid,itemid,hours,lunch,shiftid,description;
    qry->clear();
    qry->prepare("select MAX(shiftid) As maxshiftid from shiftlist");
    if(qry->exec()){
        while(qry->next()){
            shiftid=qry->value(0).toString();}}
    int id = shiftid.toInt();
    id++;
    shiftid = QString::number(id);
    qry->clear();
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
                itemid=qry->value(0).toString();
            }
        }



        hours=ui->Sections->item(i,2)->text();
        lunch=QString::number(ui->Lunch->time().hour())+":"+QString::number(ui->Lunch->time().minute());
        qry->clear();
        if(itemname=="Other")
            qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid,description) values('"
                     +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftid+"','"+description+"')");
        else
            qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid) values('"
                     +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftid+"')");


        if (qry->exec())
            success = true;
        else
            success = false;
    }


    if(deactivate){
        qry->clear();
        qry->prepare("update employeelist set active='0' where id='"+employeeid+"'");
        qry->exec();
    }

    this->hide();

    emit finished();
}
void ShiftEditForm::on_CancelButton_clicked()
{

    this->hide();
    emit finished();
}










