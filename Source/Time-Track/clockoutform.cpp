#include "clockoutform.h"
#include "mainform.h"
#include "ui_clockoutform.h"

ClockoutForm::ClockoutForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ClockoutForm)
{
    ui->setupUi(this);
    data = ((MainForm*)parentWidget())->getData();
    ui->Description->installEventFilter(this);
    clicked = false;
    ui->Projects->setStyle(new Style());
    ui->Items->setStyle(new Style());
    ui->Sections->setStyle(new Style());


    QHeaderView *verticalHeader = ui->Sections->verticalHeader();
    verticalHeader->setSectionResizeMode(QHeaderView::Fixed);
    verticalHeader->setDefaultSectionSize(70);
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
int ClockoutForm::format_time_length(QDateTime a, QDateTime b){
    int secs = a.secsTo(b);
    int minutes = secs/60;
    int hours = minutes/60;
    minutes = minutes%60;

    if(minutes<7&&minutes>=0)
    {
        minutes = 0;
    }
    else if(minutes>=7&&minutes<23)
    {
        minutes = 15;
    }
    else if(minutes>=23&&minutes<37)
    {
        minutes = 30;
    }
    else if(minutes>=37&&minutes<53)
    {
        minutes = 45;
    }
    else{
        minutes = 60;
    }
    return minutes+hours*60;
}

/* This event filter is used to detect when a lineedit is clicked
    and display a virtual keyboard if it is a tablet.*/
bool ClockoutForm::eventFilter(QObject* object,QEvent* event)
{
    if(object == ui->Description && event->type() == QEvent::MouseButtonPress) {

        ui->Description->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));


        return false;
    }
    return false;
}
/* This function is for ininializing this dialog  */

void ClockoutForm::ClockoutInitialize(QString i){

    id=i;
    ProjectInitialize();
    ItemInitialize();
    TimesInitialize();
    TimeLeft();
    ui->Description->setVisible(false);
    ui->DescriptionLabel->setVisible(false);



    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(4);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->setHorizontalHeaderItem(3,new QTableWidgetItem("Notes"));
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


           }
    }
    qry->clear();
    qry->prepare("Select time from timelist where idtimelist < 5 AND idtimelist <> 3 ORDER BY time");
    if(qry->exec())
    {
           while(qry->next())
           {

               ui->Lunch->addItem("00:"+qry->value(0).toString());

           }
    }
    ui->Lunch->addItem("01:00");
    qry->clear();
    qry->prepare("Select time from timelist where idtimelist >= 4 ORDER BY time");
    if(qry->exec())
    {
           while(qry->next())
           {
               ui->Hours->addItem(qry->value(0).toString());
           }
    }


//    ui->Hours->lineEdit()->setReadOnly(true);
//    ui->Hours->lineEdit()->setAlignment(Qt::AlignCenter);

//    ui->Minutes->lineEdit()->setReadOnly(true);
//    ui->Minutes->lineEdit()->setAlignment(Qt::AlignCenter);
//    ui->Lunch->lineEdit()->setReadOnly(true);
//    ui->Lunch->lineEdit()->setAlignment(Qt::AlignCenter);

    for (int i = 0 ; i < ui->Hours->count() ; ++i) {
        ui->Hours->setItemData(i, Qt::AlignCenter, Qt::TextAlignmentRole);
    }
    for (int i = 0 ; i < ui->Minutes->count() ; ++i) {
        ui->Minutes->setItemData(i, Qt::AlignCenter, Qt::TextAlignmentRole);
        ui->Lunch->setItemData(i, Qt::AlignCenter, Qt::TextAlignmentRole);
    }
    ui->Lunch->setCurrentIndex(2);



}
void ClockoutForm::TimeLeft(){

    QDateTime indt,outdt;
    QSqlQuery qry(data);

    outdt = QDateTime::currentDateTime();
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

    if(qry.exec())
    {
        while(qry.next())
        {
            timein = qry.value(0).toString();
            datein = qry.value(1).toString();
        }
    }


    indt = QDateTime(QDate::fromString(datein,"yyyy-MM-dd"),QTime::fromString(timein,"HH:mm:ss"));

    int minutes = format_time_length(indt,outdt);


    for(int i =0;i < ui->Sections->rowCount(); i++){


        QString item = ui->Sections->item(i,2)->text();


        minutes-=(item.split(":")[0].toInt()*60);
        minutes-=item.split(":")[1].toInt();
    }

    QString lunch = ui->Lunch->currentText();
    minutes-=(lunch.split(":")[0].toInt()*60);
    minutes-=lunch.split(":")[1].toInt();
    bool negative = false;
    if( minutes<0){
        negative = true;
    }
    int hours = minutes/60;
    minutes=minutes%60;

    QString j;
    hours = qAbs(hours);
    minutes = qAbs(minutes);
    if(negative){
        j="-";
    }
    else{
        j="";
    }
    if(minutes==0)
        j += QString::number(hours)+":"+QString::number(minutes)+"0";
    else
        j += QString::number(hours)+":"+QString::number(minutes);

    ui->timeLeft->setText(j);

}


/*These classes are used to update the table and
 * comboboxs when triggers are hit*/

void ClockoutForm::on_Add_clicked()
{
    if(ui->Items->currentText() == "Other" && ui->Description->text() == ""){
        ui->error->setText("Invalid: Add Note to the Task");
    }else{
        ui->error->setText("");
        ui->Sections->setRowCount(ui->Sections->rowCount()+1);
        ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(ui->Hours->currentText()+":"+ui->Minutes->currentText()));
        ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(ui->Projects->currentText()));
        ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(ui->Items->currentText()));
        if(ui->Items->currentText()=="Other"){
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(ui->Description->text()));
            ui->Description->setVisible(false);
            ui->DescriptionLabel->setVisible(false);
            ui->Description->setText("");
            ItemInitialize();
        }
        else{
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(""));
        }

        ui->Sections->resizeColumnsToContents();
        TimeLeft();
    }
}
void ClockoutForm::on_Edit_clicked()
{
    if(ui->Items->currentText() == "Other" && ui->Description->text() == ""){
        ui->error->setText("Invalid: Add Note to the Task");
    }else if(clicked){
        ui->Sections->setItem(selectedRow,2,new QTableWidgetItem(ui->Hours->currentText()+":"+ui->Minutes->currentText()));
        ui->Sections->setItem(selectedRow,0,new QTableWidgetItem(ui->Projects->currentText()));
        ui->Sections->setItem(selectedRow,1,new QTableWidgetItem(ui->Items->currentText()));
        if(ui->Items->currentText()=="Other"){
            ui->Sections->setItem(selectedRow,3,new QTableWidgetItem(ui->Description->text()));
            ui->Description->setVisible(false);
            ui->DescriptionLabel->setVisible(false);
            ui->Description->setText("");
            ItemInitialize();
        }
        else{
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(""));
        }
        clicked=false;
        ui->Sections->resizeColumnsToContents();
        TimeLeft();
        ui->error->setText("");
    }
    else{
        ui->error->setText("Invalid: Select an Item");
    }

}
void ClockoutForm::on_Delete_clicked()
{
    if (clicked)
    {
        if(ui->Sections->item(selectedRow,1)->text()=="Other"){
            ui->Description->setText("");
            ui->Description->setVisible(false);
            ui->DescriptionLabel->setVisible(false);
        }
        ui->Sections->removeRow(selectedRow);
        TimeLeft();
        clicked = false;
        ui->error->setText("");
    }
    else{
        ui->error->setText("Invalid: Select an Item");
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
    QString description = ui->Sections->item(row,3)->text();


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
    if(description != ""){
        ui->Description->setVisible(true);
        ui->DescriptionLabel->setVisible(true);
        ui->Description->setText(description);
    }
    else{
        ui->Description->setVisible(false);
        ui->DescriptionLabel->setVisible(false);
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
void ClockoutForm::on_Description_textChanged()
{
    TimeLeft();
}


/*These two classes are used to finish or cancel the
 * changes that the user was trying to implement.*/

void ClockoutForm::on_FinishedButton_clicked()
{

    if(data.open()){
        if(ui->timeLeft->text()!= "0:00"){
            if(ui->timeLeft->text().split(":")[0].toInt()>0){
                ui->error->setText("Invalid: Time Left Must Be 0:00");
            }
            else{
                ui->error->setText("Invalid: Time Left Must Be 0:00");
            }
        }else if(ui->Sections->rowCount()<1){
            ui->error->setText("Invalid: No Projects Added to Timesheet");
        }
        else{
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
            QDateTime clockout = QDateTime::currentDateTime();
            QString timeout = clockout.toString("HH:mm:ss");
            QString dateout = clockout.toString("yyyy-MM-dd");

            qry->clear();
            qry->prepare("delete from shiftlist where shiftid='"+shiftId+"'");
            qry->exec();
            QString projectname,itemname, projectid,itemid,hours,lunch,description;


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
                description = ui->Sections->item(i,3)->text();

                if(description!="")
                    qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid,description) values('"
                             +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftId+"','"+description+"')");
                else
                    qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid) values('"
                             +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftId+"')");

                qry->exec();
                qDebug()<<qry->lastError();
                qDebug()<<qry->lastQuery();

            }


            qry->clear();
            qry->prepare("update employeelist set active='0' where id='"+employeeid+"'");
            qry->exec();


            this->hide();

            emit finished();
        }

    }
    else{
        ui->error->setText("Disconnected From Database. Verify Connection and Try Again");
    }

}
void ClockoutForm::on_CancelButton_clicked()
{

    this->hide();
    emit finished();
}

void ClockoutForm::on_Items_currentTextChanged(const QString &arg1)
{
    if(arg1 =="Other"){
        ui->Description->setVisible(true);
        ui->DescriptionLabel->setVisible(true);
        ui->Description->setText("");
    }
    else{
        ui->Description->setVisible(false);
        ui->DescriptionLabel->setVisible(false);
    }
}

