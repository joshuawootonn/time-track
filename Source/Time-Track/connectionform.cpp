#include "connectionform.h"
#include "ui_connectionform.h"
#include "mainform.h"

ConnectionForm::ConnectionForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ConnectionForm)
{
    ui->setupUi(this);
    ui->Conn->addItem("192.168.0.11");
    ui->Conn->addItem("192.168.41.187");

}

ConnectionForm::~ConnectionForm()
{
    delete ui;
}
QString ConnectionForm::getConnectionName(){
    return ui->Conn->currentText();
}

void ConnectionForm::on_buttonBox_accepted()
{
    //((MainForm*)parentWidget())->SetHostName(ui->Conn->currentText());
    //emit finished();
    this->hide();
}

void ConnectionForm::on_buttonBox_rejected()
{
    this->hide();
}
