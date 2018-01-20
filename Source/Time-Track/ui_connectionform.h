/********************************************************************************
** Form generated from reading UI file 'connectionform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CONNECTIONFORM_H
#define UI_CONNECTIONFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ConnectionForm
{
public:
    QGridLayout *gridLayout;
    QWidget *verticalWidget;
    QVBoxLayout *verticalLayout;
    QWidget *horizontalWidget;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_5;
    QLineEdit *databaseEdit;
    QWidget *horizontalWidget_2;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_6;
    QLineEdit *portEdit;
    QWidget *horizontalWidget_3;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_4;
    QLineEdit *usernameEdit;
    QWidget *horizontalWidget_4;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_3;
    QLineEdit *passwordEdit;
    QWidget *horizontalWidget_5;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_2;
    QComboBox *ipEdit;
    QPushButton *testConnection;
    QWidget *ipeditwidget;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *ipEdit2;
    QWidget *widget;
    QHBoxLayout *_2;
    QLabel *error;
    QSpacerItem *horizontalSpacer;
    QPushButton *connect;
    QProgressBar *progress;

    void setupUi(QDialog *ConnectionForm)
    {
        if (ConnectionForm->objectName().isEmpty())
            ConnectionForm->setObjectName(QStringLiteral("ConnectionForm"));
        ConnectionForm->resize(907, 629);
        ConnectionForm->setStyleSheet(QLatin1String("QDialog#ConnectionForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 32px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#D1D1D1;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
""
                        "\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#8DAA91;\n"
"\n"
"}\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
"\n"
"\n"
""));
        gridLayout = new QGridLayout(ConnectionForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        verticalWidget = new QWidget(ConnectionForm);
        verticalWidget->setObjectName(QStringLiteral("verticalWidget"));
        verticalLayout = new QVBoxLayout(verticalWidget);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalWidget = new QWidget(verticalWidget);
        horizontalWidget->setObjectName(QStringLiteral("horizontalWidget"));
        horizontalLayout_3 = new QHBoxLayout(horizontalWidget);
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_5 = new QLabel(horizontalWidget);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setMinimumSize(QSize(150, 70));

        horizontalLayout_3->addWidget(label_5);

        databaseEdit = new QLineEdit(horizontalWidget);
        databaseEdit->setObjectName(QStringLiteral("databaseEdit"));
        databaseEdit->setMinimumSize(QSize(0, 70));
        databaseEdit->setInputMethodHints(Qt::ImhHiddenText|Qt::ImhNoAutoUppercase|Qt::ImhNoPredictiveText|Qt::ImhSensitiveData);
        databaseEdit->setEchoMode(QLineEdit::Normal);

        horizontalLayout_3->addWidget(databaseEdit);


        verticalLayout->addWidget(horizontalWidget);

        horizontalWidget_2 = new QWidget(verticalWidget);
        horizontalWidget_2->setObjectName(QStringLiteral("horizontalWidget_2"));
        horizontalLayout_4 = new QHBoxLayout(horizontalWidget_2);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_6 = new QLabel(horizontalWidget_2);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setMinimumSize(QSize(150, 0));

        horizontalLayout_4->addWidget(label_6);

        portEdit = new QLineEdit(horizontalWidget_2);
        portEdit->setObjectName(QStringLiteral("portEdit"));
        portEdit->setMinimumSize(QSize(0, 70));
        portEdit->setInputMethodHints(Qt::ImhHiddenText|Qt::ImhNoAutoUppercase|Qt::ImhNoPredictiveText|Qt::ImhSensitiveData);
        portEdit->setEchoMode(QLineEdit::Normal);

        horizontalLayout_4->addWidget(portEdit);


        verticalLayout->addWidget(horizontalWidget_2);

        horizontalWidget_3 = new QWidget(verticalWidget);
        horizontalWidget_3->setObjectName(QStringLiteral("horizontalWidget_3"));
        horizontalLayout_5 = new QHBoxLayout(horizontalWidget_3);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_4 = new QLabel(horizontalWidget_3);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(150, 0));

        horizontalLayout_5->addWidget(label_4);

        usernameEdit = new QLineEdit(horizontalWidget_3);
        usernameEdit->setObjectName(QStringLiteral("usernameEdit"));
        usernameEdit->setMinimumSize(QSize(0, 70));
        usernameEdit->setInputMethodHints(Qt::ImhHiddenText|Qt::ImhNoAutoUppercase|Qt::ImhNoPredictiveText|Qt::ImhSensitiveData);

        horizontalLayout_5->addWidget(usernameEdit);


        verticalLayout->addWidget(horizontalWidget_3);

        horizontalWidget_4 = new QWidget(verticalWidget);
        horizontalWidget_4->setObjectName(QStringLiteral("horizontalWidget_4"));
        horizontalLayout_6 = new QHBoxLayout(horizontalWidget_4);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_3 = new QLabel(horizontalWidget_4);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setMinimumSize(QSize(150, 0));

        horizontalLayout_6->addWidget(label_3);

        passwordEdit = new QLineEdit(horizontalWidget_4);
        passwordEdit->setObjectName(QStringLiteral("passwordEdit"));
        passwordEdit->setMinimumSize(QSize(0, 70));
        passwordEdit->setEchoMode(QLineEdit::Password);

        horizontalLayout_6->addWidget(passwordEdit);


        verticalLayout->addWidget(horizontalWidget_4);

        horizontalWidget_5 = new QWidget(verticalWidget);
        horizontalWidget_5->setObjectName(QStringLiteral("horizontalWidget_5"));
        horizontalLayout_7 = new QHBoxLayout(horizontalWidget_5);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        label_2 = new QLabel(horizontalWidget_5);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMinimumSize(QSize(150, 0));
        label_2->setMaximumSize(QSize(75, 16777215));

        horizontalLayout_7->addWidget(label_2);

        ipEdit = new QComboBox(horizontalWidget_5);
        ipEdit->setObjectName(QStringLiteral("ipEdit"));
        ipEdit->setMinimumSize(QSize(0, 70));
        ipEdit->setEditable(false);

        horizontalLayout_7->addWidget(ipEdit);

        testConnection = new QPushButton(horizontalWidget_5);
        testConnection->setObjectName(QStringLiteral("testConnection"));
        testConnection->setMinimumSize(QSize(0, 25));
        testConnection->setMaximumSize(QSize(25, 16777215));

        horizontalLayout_7->addWidget(testConnection);


        verticalLayout->addWidget(horizontalWidget_5);

        ipeditwidget = new QWidget(verticalWidget);
        ipeditwidget->setObjectName(QStringLiteral("ipeditwidget"));
        horizontalLayout = new QHBoxLayout(ipeditwidget);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout->setContentsMargins(9, 9, 9, 9);
        label = new QLabel(ipeditwidget);
        label->setObjectName(QStringLiteral("label"));
        label->setMinimumSize(QSize(150, 0));
        label->setMaximumSize(QSize(75, 16777215));

        horizontalLayout->addWidget(label);

        ipEdit2 = new QLineEdit(ipeditwidget);
        ipEdit2->setObjectName(QStringLiteral("ipEdit2"));
        ipEdit2->setMinimumSize(QSize(0, 70));

        horizontalLayout->addWidget(ipEdit2);


        verticalLayout->addWidget(ipeditwidget);

        widget = new QWidget(verticalWidget);
        widget->setObjectName(QStringLiteral("widget"));
        _2 = new QHBoxLayout(widget);
        _2->setSpacing(0);
        _2->setObjectName(QStringLiteral("_2"));
        error = new QLabel(widget);
        error->setObjectName(QStringLiteral("error"));
        error->setMaximumSize(QSize(16777215, 29));

        _2->addWidget(error);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        _2->addItem(horizontalSpacer);

        connect = new QPushButton(widget);
        connect->setObjectName(QStringLiteral("connect"));
        connect->setMinimumSize(QSize(150, 70));
        connect->setMaximumSize(QSize(16777215, 70));

        _2->addWidget(connect);


        verticalLayout->addWidget(widget);

        progress = new QProgressBar(verticalWidget);
        progress->setObjectName(QStringLiteral("progress"));
        progress->setValue(0);
        progress->setOrientation(Qt::Horizontal);
        progress->setInvertedAppearance(false);

        verticalLayout->addWidget(progress);


        gridLayout->addWidget(verticalWidget, 0, 0, 1, 1);

        QWidget::setTabOrder(databaseEdit, portEdit);
        QWidget::setTabOrder(portEdit, usernameEdit);
        QWidget::setTabOrder(usernameEdit, passwordEdit);
        QWidget::setTabOrder(passwordEdit, connect);

        retranslateUi(ConnectionForm);

        QMetaObject::connectSlotsByName(ConnectionForm);
    } // setupUi

    void retranslateUi(QDialog *ConnectionForm)
    {
        ConnectionForm->setWindowTitle(QApplication::translate("ConnectionForm", "Connection Setup", Q_NULLPTR));
        label_5->setText(QApplication::translate("ConnectionForm", "Database:", Q_NULLPTR));
        label_6->setText(QApplication::translate("ConnectionForm", "Port:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ConnectionForm", "Username:", Q_NULLPTR));
        label_3->setText(QApplication::translate("ConnectionForm", "Password:", Q_NULLPTR));
        label_2->setText(QApplication::translate("ConnectionForm", "IP:", Q_NULLPTR));
        testConnection->setText(QApplication::translate("ConnectionForm", "?", Q_NULLPTR));
        label->setText(QString());
        error->setText(QString());
        connect->setText(QApplication::translate("ConnectionForm", "Connect", Q_NULLPTR));
        progress->setFormat(QString());
    } // retranslateUi

};

namespace Ui {
    class ConnectionForm: public Ui_ConnectionForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CONNECTIONFORM_H
